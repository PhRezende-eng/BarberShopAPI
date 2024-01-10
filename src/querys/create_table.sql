CREATE TABLE
    users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        profile VARCHAR(255) NOT NULL,
        work_days TEXT [] NOT NULL,
        work_hours INTEGER [] NOT NULL
    );

CREATE TABLE
    schedules (
        id SERIAL PRIMARY KEY,
        barbershop_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        client_name VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        time INTEGER NOT NULL
    );

CREATE TABLE
    barbershops (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        opening_day TEXT [] NOT NULL,
        opening_hours INTEGER [] NOT NULL
    );

CREATE TABLE adm_users (id SERIAL PRIMARY KEY);