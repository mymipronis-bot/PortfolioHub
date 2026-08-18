"""
database.py
Gère la connexion à la base SQLite et les fonctions d'accès aux données
pour PortfolioHub.
"""

import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "portfoliohub.db")
SCHEMA_PATH = os.path.join(os.path.dirname(__file__), "schema.sql")


def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


def init_db():
    conn = get_connection()
    with open(SCHEMA_PATH, "r", encoding="utf-8") as f:
        conn.executescript(f.read())
    conn.commit()
    conn.close()


# ---------- PROFILS ----------

def create_profile(slug, full_name, bio="", avatar_url="", template="minimal",
                    default_theme="light", default_language="fr"):
    conn = get_connection()
    try:
        cur = conn.execute(
            """INSERT INTO profiles
               (slug, full_name, bio, avatar_url, template, default_theme, default_language)
               VALUES (?, ?, ?, ?, ?, ?, ?)""",
            (slug, full_name, bio, avatar_url, template, default_theme, default_language),
        )
        conn.commit()
        return cur.lastrowid
    finally:
        conn.close()


def set_qr_code_url(profile_id, qr_code_url):
    conn = get_connection()
    try:
        conn.execute(
            "UPDATE profiles SET qr_code_url = ? WHERE id = ?", (qr_code_url, profile_id)
        )
        conn.commit()
    finally:
        conn.close()


def increment_view_count(slug):
    conn = get_connection()
    try:
        conn.execute(
            "UPDATE profiles SET view_count = view_count + 1 WHERE slug = ?", (slug,)
        )
        conn.commit()
    finally:
        conn.close()


def get_profile_by_slug(slug):
    conn = get_connection()
    try:
        profile = conn.execute(
            "SELECT * FROM profiles WHERE slug = ?", (slug,)
        ).fetchone()
        if profile is None:
            return None

        profile = dict(profile)
        profile["social_links"] = [
            dict(row)
            for row in conn.execute(
                "SELECT platform, url FROM social_links WHERE profile_id = ?",
                (profile["id"],),
            ).fetchall()
        ]
        profile["works"] = [
            dict(row)
            for row in conn.execute(
                """SELECT * FROM works WHERE profile_id = ?
                   ORDER BY position ASC, id ASC""",
                (profile["id"],),
            ).fetchall()
        ]
        return profile
    finally:
        conn.close()


def slug_exists(slug):
    conn = get_connection()
    try:
        row = conn.execute("SELECT 1 FROM profiles WHERE slug = ?", (slug,)).fetchone()
        return row is not None
    finally:
        conn.close()


def update_profile(profile_id, **fields):
    """Met à jour dynamiquement les champs fournis (full_name, bio, template, etc.)."""
    allowed = {"full_name", "bio", "avatar_url", "template", "default_theme", "default_language"}
    updates = {k: v for k, v in fields.items() if k in allowed and v is not None}
    if not updates:
        return

    conn = get_connection()
    try:
        set_clause = ", ".join(f"{k} = ?" for k in updates)
        values = list(updates.values()) + [profile_id]
        conn.execute(f"UPDATE profiles SET {set_clause} WHERE id = ?", values)
        conn.commit()
    finally:
        conn.close()


# ---------- LIENS SOCIAUX ----------

def add_social_link(profile_id, platform, url):
    conn = get_connection()
    try:
        conn.execute(
            "INSERT INTO social_links (profile_id, platform, url) VALUES (?, ?, ?)",
            (profile_id, platform, url),
        )
        conn.commit()
    finally:
        conn.close()


# ---------- RÉALISATIONS (WORKS) ----------

def add_work(profile_id, title, description="", media_url="", link_url="", position=0):
    conn = get_connection()
    try:
        cur = conn.execute(
            """INSERT INTO works (profile_id, title, description, media_url, link_url, position)
               VALUES (?, ?, ?, ?, ?, ?)""",
            (profile_id, title, description, media_url, link_url, position),
        )
        conn.commit()
        return cur.lastrowid
    finally:
        conn.close()


def delete_work(work_id, profile_id):
    conn = get_connection()
    try:
        conn.execute(
            "DELETE FROM works WHERE id = ? AND profile_id = ?", (work_id, profile_id)
        )
        conn.commit()
    finally:
        conn.close()


# ---------- MESSAGES DE CONTACT ----------

def add_message(profile_id, sender_name, sender_email, content):
    conn = get_connection()
    try:
        cur = conn.execute(
            """INSERT INTO messages (profile_id, sender_name, sender_email, content)
               VALUES (?, ?, ?, ?)""",
            (profile_id, sender_name, sender_email, content),
        )
        conn.commit()
        return cur.lastrowid
    finally:
        conn.close()


def get_messages(profile_id):
    conn = get_connection()
    try:
        return [
            dict(row)
            for row in conn.execute(
                "SELECT * FROM messages WHERE profile_id = ? ORDER BY created_at DESC",
                (profile_id,),
            ).fetchall()
        ]
    finally:
        conn.close()
