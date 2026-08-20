# config.py
"""Configuration module for PortfolioHub.
This file centralizes all configurable settings, making it easy to manage
environment‑specific values (development, production, testing) via
environment variables or defaults.
"""
import os
from pathlib import Path

# Base directory of the project
BASE_DIR = Path(__file__).resolve().parent

# Secret key for Flask session & CSRF protection. In production, set via env.
SECRET_KEY = os.getenv("FLASK_SECRET_KEY", "dev-secret-key")

# Upload settings
UPLOAD_FOLDER = os.path.join(BASE_DIR, "static", "uploads")
QRCODE_FOLDER = os.path.join(BASE_DIR, "static", "qrcodes")
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif", "webp", "mp4"}
MAX_CONTENT_LENGTH = 10 * 1024 * 1024  # 10 MiB per file

# CORS origins – allow all for development; restrict in production.
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*")
