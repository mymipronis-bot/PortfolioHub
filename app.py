"""
app.py
Application Flask principale de PortfolioHub (v2).
Fonctionnalités : création de portfolio, thèmes multiples, langue FR/EN,
compteur de vues, QR code du lien partageable, formulaire de contact.
"""

import os
import re
import unicodedata
import qrcode
from flask import Flask, request, jsonify, render_template, url_for
from werkzeug.utils import secure_filename
import config
from flask_cors import CORS
from flask_seasurf import SeaSurf

import database as db
from portfoliohub.forms import CreateProfileForm

app = Flask(__name__)
app.secret_key = config.SECRET_KEY
app.config["UPLOAD_FOLDER"] = config.UPLOAD_FOLDER
app.config["QRCODE_FOLDER"] = config.QRCODE_FOLDER

CORS(app, resources={r"/api/*": {"origins": config.CORS_ORIGINS}})
csrf = SeaSurf(app)

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif", "webp", "mp4"}
VALID_TEMPLATES = {"minimal", "colorful", "dark-elegant"}


# ---------- UTILITAIRES ----------

def slugify(text):
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("ascii")
    text = re.sub(r"[^\w\s-]", "", text).strip().lower()
    return re.sub(r"[\s_]+", "-", text)


def unique_slug(base_slug):
    slug = base_slug
    counter = 2
    while db.slug_exists(slug):
        slug = f"{base_slug}-{counter}"
        counter += 1
    return slug


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def save_upload(file_storage):
    if not file_storage or file_storage.filename == "":
        return None
    if not allowed_file(file_storage.filename):
        return None
    filename = secure_filename(file_storage.filename)
    unique_name = f"{os.urandom(4).hex()}_{filename}"
    file_storage.save(os.path.join(app.config["UPLOAD_FOLDER"], unique_name))
    return f"/static/uploads/{unique_name}"


def generate_qr_code(slug, portfolio_url):
    """Génère un QR code PNG pointant vers l'URL du portfolio."""
    img = qrcode.make(portfolio_url)
    filename = f"{slug}.png"
    img.save(os.path.join(config.QRCODE_FOLDER, filename))
    return f"/static/qrcodes/{filename}"


# ---------- ROUTES API ----------

@app.route("/api/profiles", methods=["POST"])
@csrf.exempt
def create_profile():
    full_name = request.form.get("full_name", "").strip()
    bio = request.form.get("bio", "").strip()
    template = request.form.get("template", "minimal")
    default_theme = request.form.get("default_theme", "light")
    default_language = request.form.get("default_language", "fr")

    if not full_name:
        return jsonify({"error": "Le nom complet est requis."}), 400
    if template not in VALID_TEMPLATES:
        template = "minimal"
    if default_theme not in {"light", "dark"}:
        default_theme = "light"
    if default_language not in {"fr", "en"}:
        default_language = "fr"

    avatar_url = save_upload(request.files.get("avatar")) or ""
    slug = unique_slug(slugify(full_name))
    profile_id = db.create_profile(
        slug, full_name, bio, avatar_url, template, default_theme, default_language
    )

    # Génère le QR code une fois l'URL publique connue
    portfolio_url = request.host_url.rstrip("/") + url_for("public_portfolio", slug=slug)
    qr_url = generate_qr_code(slug, portfolio_url)
    db.set_qr_code_url(profile_id, qr_url)

    return jsonify({
        "id": profile_id,
        "slug": slug,
        "url": f"/{slug}",
        "qr_code_url": qr_url,
    }), 201


@app.route("/api/profiles/<slug>", methods=["GET"])
def get_profile(slug):
    profile = db.get_profile_by_slug(slug)
    if profile is None:
        return jsonify({"error": "Profil introuvable."}), 404
    return jsonify(profile)


@app.route("/api/profiles/<int:profile_id>/social-links", methods=["POST"])
@csrf.exempt
def add_social_link(profile_id):
    data = request.get_json(silent=True) or {}
    platform = data.get("platform", "").strip()
    url = data.get("url", "").strip()
    if not platform or not url:
        return jsonify({"error": "platform et url sont requis."}), 400
    db.add_social_link(profile_id, platform, url)
    return jsonify({"message": "Lien ajouté."}), 201


@app.route("/api/profiles/<int:profile_id>/works", methods=["POST"])
@csrf.exempt
def add_work(profile_id):
    title = request.form.get("title", "").strip()
    description = request.form.get("description", "").strip()
    link_url = request.form.get("link_url", "").strip()
    position = request.form.get("position", 0, type=int)

    if not title:
        return jsonify({"error": "Le titre est requis."}), 400

    media_url = save_upload(request.files.get("media")) or ""
    work_id = db.add_work(profile_id, title, description, media_url, link_url, position)
    return jsonify({"id": work_id, "message": "Réalisation ajoutée."}), 201


@app.route("/api/works/<int:work_id>", methods=["DELETE"])
@csrf.exempt
def delete_work(work_id):
    profile_id = request.args.get("profile_id", type=int)
    if not profile_id:
        return jsonify({"error": "profile_id requis."}), 400
    db.delete_work(work_id, profile_id)
    return jsonify({"message": "Réalisation supprimée."})


@app.route("/api/profiles/<slug>/contact", methods=["POST"])
@csrf.exempt
def contact_profile(slug):
    """Reçoit un message envoyé via le formulaire de contact du portfolio public."""
    profile = db.get_profile_by_slug(slug)
    if profile is None:
        return jsonify({"error": "Profil introuvable."}), 404

    data = request.get_json(silent=True) or request.form
    sender_name = (data.get("sender_name") or "").strip()
    sender_email = (data.get("sender_email") or "").strip()
    content = (data.get("content") or "").strip()

    if not sender_name or not sender_email or not content:
        return jsonify({"error": "Tous les champs sont requis."}), 400

    db.add_message(profile["id"], sender_name, sender_email, content)
    return jsonify({"message": "Message envoyé."}), 201



@app.route("/api/profiles/<int:profile_id>/messages", methods=["GET"])
def list_messages(profile_id):
    """Permet au propriétaire du portfolio de consulter ses messages reçus."""
    return jsonify(db.get_messages(profile_id))


# ---------- ROUTES PAGES ----------

@app.route("/")
def home():
    profiles = db.get_all_profiles()
    return render_template("home.html", profiles=profiles)


@app.route("/create")
def create_page():
    form = CreateProfileForm()
    return render_template("create.html", form=form)


@app.route("/<slug>")
def public_portfolio(slug):
    profile = db.get_profile_by_slug(slug)
    if profile is None:
        return render_template("404.html"), 404

    db.increment_view_count(slug)
    profile["view_count"] += 1  # reflète le +1 pour l'affichage immédiat

    return render_template(
        "portfolio.html",
        profile=profile,
        template_class=profile["template"],
    )


# S'exécute à chaque démarrage de l'app (local ET production/gunicorn)
os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)
os.makedirs(app.config["QRCODE_FOLDER"], exist_ok=True)
db.init_db()

if __name__ == "__main__":
    app.run(debug=True, port=5000)

