# PortfolioHub

Créateur de portfolio en une page pour artistes et créatifs. Génère un lien
partageable en quelques minutes, sans code.

## Fonctionnalités

- Portfolio en une page avec lien unique (slug)
- Thème clair / sombre
- Langue FR / EN
- Compteur de vues
- QR code du lien à partager
- Formulaire de contact
- 3 styles visuels : Minimal, Colorful, Dark Elegant

## Stack technique

- Backend : Python (Flask) + SQLite
- Frontend : HTML / CSS / JavaScript

## Installation

```bash
git clone <url-du-repo>
cd portfoliohub
pip install -r requirements.txt
python app.py
```

L'application est accessible sur `http://localhost:5000`.

## Structure du projet

```
portfoliohub/
├── app.py              # Routes Flask (API + pages)
├── database.py         # Accès à la base SQLite
├── schema.sql           # Schéma des tables
├── requirements.txt
├── static/
│   ├── css/style.css
│   ├── js/i18n.js
│   ├── js/theme.js
│   ├── uploads/         # Médias uploadés (ignoré par git)
│   └── qrcodes/         # QR codes générés (ignoré par git)
└── templates/
    ├── base.html
    ├── home.html
    ├── create.html
    ├── portfolio.html
    └── 404.html
```

## Auteur

Massoh Manuella
