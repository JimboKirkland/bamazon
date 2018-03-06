-- SCHEMA DATABASE SETUP FOR PRODUCTS DATABASE
-- TABLE (SEEDS) IN /db/seeds.sql FILE

DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  department_name VARCHAR (255) NOT NULL,
  price INTEGER(10),
  stock_quantity INTEGER(10),
  PRIMARY KEY (item_id)
);



INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Purple Sticky Punch", "Colorado", 45, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mary Tyler Moore High Than You Want", "California", 85, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("THC-Me-Now?", "Vermont", 65, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Grandma's Candy Bowl", "Florida", 15, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Willie Nelson Nightmare", "Montana", 105, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sticks & Stems", "Guy on the Corner", 5, 2000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Forget To Gamble", "Nevada", 75, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Is This FreeRange?", "Oregon", 85, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Southern Wall Diversion", "Canada", 23, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("I Cannabis-lieve It's Not Legal", "Georgia", 85, 285);




USE bamazonDB;
SELECT * FROM products;