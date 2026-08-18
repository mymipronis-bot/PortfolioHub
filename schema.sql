-- Schéma de la base de données PortfolioHub (v2)

CREATE TABLE IF NOT EXISTS profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,              -- lien unique, ex: manuella-massoh
    full_name TEXT NOT NULL,
    bio TEXT,
    avatar_url TEXT,
    template TEXT DEFAULT 'minimal',        -- minimal | colorful | dark-elegant
    default_theme TEXT DEFAULT 'light',     -- light | dark (thème par défaut du portfolio)
    default_language TEXT DEFAULT 'fr',     -- fr | en (langue par défaut du portfolio)
    view_count INTEGER DEFAULT 0,
    qr_code_url TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS social_links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    profile_id INTEGER NOT NULL,
    platform TEXT NOT NULL,                 -- instagram, behance, linkedin...
    url TEXT NOT NULL,
    FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS works (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    profile_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    media_url TEXT,
    link_url TEXT,
    position INTEGER DEFAULT 0,
    FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
);

-- Messages envoyés via le formulaire de contact du portfolio
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    profile_id INTEGER NOT NULL,
    sender_name TEXT NOT NULL,
    sender_email TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
);
