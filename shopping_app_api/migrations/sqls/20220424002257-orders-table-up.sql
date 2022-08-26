CREATE TABLE orders (
    orderid SERIAL PRIMARY KEY,
    status VARCHAR(15),
    user_id bigint REFERENCES users(userid)
);



