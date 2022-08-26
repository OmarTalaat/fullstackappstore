CREATE TABLE users (
    userid SERIAL PRIMARY KEY,
    username VARCHAR(100),
    user_password VARCHAR
);



INSERT INTO users
( username, user_password)
VALUES
( 'Admin', 'password')

