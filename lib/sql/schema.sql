DROP DATABASE IF EXISTS LorenzoList_db;

CREATE DATABASE LorenzoList_db;

USE LorenzoList_db;

CREATE TABLE Users (
    id INTEGER NOT NULL AUTO_INCREMENT,
    username VARCHAR(60) NOT NULL,
    email VARCHAR(60) NOT NULL,
    password VARCHAR(32) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE Categories (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE Items (
    id INTEGER NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    category_id INTEGER NOT NULL,
	title VARCHAR(255) NOT NULL,
    price INTEGER NULL,
    img VARCHAR(255),
    post TEXT,
    user_id INTEGER NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_user_id`
    FOREIGN KEY (user_id) 
        REFERENCES Users(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT `fk_category_id`
    FOREIGN KEY (category_id) 
        REFERENCES Categories(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT        
);

CREATE TABLE Messages (
    id INTEGER NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    author_id INTEGER NOT NULL,
    recipient_id INTEGER NOT NULL,
    body TEXT,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_author_id`
        FOREIGN KEY (author_id) 
            REFERENCES Users(id)
            ON UPDATE CASCADE
            ON DELETE RESTRICT,
    CONSTRAINT `fk_recipient_id`
        FOREIGN KEY (recipient_id) 
            REFERENCES Users(id)
            ON UPDATE CASCADE
            ON DELETE RESTRICT
);
 
