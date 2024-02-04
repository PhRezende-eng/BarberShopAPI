INSERT INTO
    "User" (
        id, name, email, password, profile, work_days, work_hours
    )
VALUES (
        5, 'Paulo Henrique', 'paulo@gmail.com', '12345', 'ADM', '{"Seg", "Qua"}', '{6, 7, 8}'
    );

INSERT INTO
    "Barbershop" (
        id, user_id, name, email, opening_day, opening_hours
    )
VALUES (
        2, 5, 'Barbearia X', 'barbearia@gmail.com', '{"Seg", "Qua", "Sab"}', '{6, 7, 8, 9, 18, 19, 20, 12, 13}'
    );

INSERT INTO
    "Schedule" (
        id,
        barbershop_id,
        user_id,
        client_name,
        date,
        time
    )
VALUES (
        1,
        2,
        5,
        'Teste',
        '2023-08-09':: date,
        8
    );