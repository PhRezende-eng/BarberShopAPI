## Barber Shop API
This is a API to server the app barber shop that can be found here: https://github.com/PhRezende-eng/BarberShop

## How to Install and Configure PostgresSQL
https://www.hostinger.com/tutorials/how-to-install-postgresql-on-ubuntu

Connecting to DB
```
$sudo -u postgres psql
```

Running migrations
```
$yarn prisma migrate dev
```

Running PG ADMIN
```
$sudo /usr/pgadmin4/bin/setup-web.sh
```

Create new password to get permission to create server on pgAdmin with:
Insert this commando into psql terminal

```
ALTER USER postgres WITH PASSWORD 'new_password';
```


