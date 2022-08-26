CREATE TABLE products (
    productid SERIAL PRIMARY KEY,
    name VARCHAR(50),
    price FLOAT,
    category_id bigint REFERENCES categories(categoryid)
    
);