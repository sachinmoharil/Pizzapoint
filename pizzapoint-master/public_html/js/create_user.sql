/***********************************************************
* Create the database named contactdb and all of its tables
************************************************************/

DROP DATABASE IF EXISTS swethapizzadb;

CREATE DATABASE swethapizzadb;

USE swethapizzadb;

CREATE TABLE Orderdetails (
    OrderID INT NOT NULL AUTO_INCREMENT,
    sizeOfPizza VARCHAR(50),
    kindOfPizza VARCHAR(50),
    cheese  VARCHAR(50),
    quantity INT NOT NULL,
    totalPrice  INT,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    DeliveryAddress VARCHAR(100),
    TelephoneNumber VARCHAR(10),
    SalesType VARCHAR(50),
    CreditCardType VARCHAR(50),
    CreditCardNumber VARCHAR(50),
    CreditCardExpiration VARCHAR(50),

    PRIMARY KEY(OrderID)
);