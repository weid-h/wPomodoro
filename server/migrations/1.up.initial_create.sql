CREATE TABLE IF NOT EXISTS userdata (
    id serial PRIMARY KEY,
    google_identifier VARCHAR(255) UNIQUE NOT NULL,
    user_data BYTEA NOT NULL
);