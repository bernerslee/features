DROP DATABASE IF EXISTS zillow;

CREATE DATABASE zillow;

USE zillow;

CREATE TABLE features (
    house_id int NOT NULL AUTO_INCREMENT,
    type varchar(255),
    year_built varchar (255),
    heating varchar (255),
    cooling varchar (255),
    parking varchar (255),
    lot varchar (255),
    days_on_zillow varchar (255),
    price_per_sqft varchar (255),
    PRIMARY KEY (house_id)
) ENGINE = INNODB;

CREATE TABLE interior_features (
 feature_id int NOT NULL AUTO_INCREMENT,
 bedrooms varchar(255),
 bathrooms varchar (255),
 interiorheating varchar (255),
 interiorcooling varchar (255),
 appliances varchar (255),
 kitchen varchar (255),
 flooring varchar (255),
 house_id varchar (255),
 sqft varchar (255),
 PRIMARY KEY (feature_id)
) ENGINE = INNODB;
