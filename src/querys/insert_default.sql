-- Insert data for User table
INSERT INTO
    "User" (
        "id", "name", "email", "profile", "password", "avatar"
    )
VALUES (
        5, 'Paulo Henrique', 'paulo@gmail.com', 'A', '12345', NULL
    );

-- Insert data for UserADM table
INSERT INTO
    "UserADM" (
        "user_id", "work_days", "work_hours"
    )
VALUES (
        5, '{"Seg", "Qua"}', '{6, 7, 8}'
    );

-- Insert data for Barbershop table
INSERT INTO
    "Barbershop" (
        "id", "user_id", "name", "email", "opening_day", "opening_hours"
    )
VALUES (
        2, 5, 'Barbearia X', 'barbearia@gmail.com', '{"Seg", "Qua", "Sab"}', '{6, 7, 8, 9, 18, 19, 20, 12, 13}'
    );

-- Insert data for Schedule table
INSERT INTO
    "Schedule" (
        "id", "barbershop_id", "user_id", "client_name", "date", "time"
    )
VALUES (
        1, 2, 5, 'Teste', '2023-08-09T00:00:00.000Z', 8
    );