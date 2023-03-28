/*
    Project Step 3 Final SQL queries
    Group 26
    Member names: Victoria Sok, Guyllian Dela Rosa
*/

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

DROP TABLE IF EXISTS customers, employees, vehicle_specifications, statuses, vehicles, vehicle_sales;

-- Create customers object table
CREATE TABLE `customers` (
    `customer_id` INT AUTO_INCREMENT UNIQUE NOT NULL,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `phone_num` VARCHAR(15),
    PRIMARY KEY (`customer_id`)
);

-- Add data to the customers table
INSERT INTO `customers` (
    first_name, last_name, email, phone_num
)
VALUES 
    ('Roger', 'Smith', 'rsmith@gmail.com', '569-569-5695'),
    ('Robert', 'Hill', 'bobbyh@gmail.com', '123-123-1234'),
    ('Margaret', 'Platter', 'peggyp@gmail.com', NULL);


-- Create employees object table
CREATE TABLE `employees` (
    `emp_id` INT AUTO_INCREMENT UNIQUE NOT NULL,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `phone_num` VARCHAR(15) NOT NULL,
    PRIMARY KEY (`emp_id`)
);

-- Add data to the employees table
INSERT INTO `employees` (
    first_name, last_name, email, phone_num
)
VALUES 
    ('Simon', 'Marshall', 'sm@gmail.com', '111-222-3333'),
    ('Kara', "D'levine", 'kard@gmail.com', '852-963-7411'),
    ('Callie', 'Holman', 'calh@gmail.com', '123-456-7899');


-- Create vehicle_specifications object table
CREATE TABLE `vehicle_specifications` (
    `spec_id` INT AUTO_INCREMENT UNIQUE NOT NULL,
    `make` VARCHAR(20) NOT NULL,
    `model` VARCHAR(20) NOT NULL,
    `fuel_type` VARCHAR(15) NOT NULL,
    `body_type` VARCHAR(15) NOT NULL,
    PRIMARY KEY (`spec_id`)
);

-- Add data to the vehicle_specifications table
INSERT INTO `vehicle_specifications` (
    make, model, fuel_type, body_type
)
VALUES
    ('Rivian', 'R1T', 'Electric', 'Truck'),
    ('Honda', 'CRV', 'Gasoline', 'SUV'),
    ('Subaru', 'WRX', 'Gasoline', 'Sedan');


-- Create statuses object table
CREATE TABLE `statuses` (
    `status_id` INT AUTO_INCREMENT NOT NULL,
    `status` VARCHAR(20) NOT NULL,
    PRIMARY KEY (`status_id`)
);

-- Add data to the statuses table
INSERT INTO `statuses` (status)
VALUES 
    ('Available'),
    ('Sold'),
    ('Hold');


-- Create vehicles object table
CREATE TABLE `vehicles` (
    `vin_num` VARCHAR(20) UNIQUE NOT NULL,
    `spec_id` INT NOT NULL,
    `list_price` INT NOT NULL,
    `status_id` INT NOT NULL,
    `year` INT NOT NULL,
    `color` VARCHAR(10) NOT NULL,
    PRIMARY KEY (`vin_num`),
    FOREIGN KEY (`spec_id`) REFERENCES vehicle_specifications (`spec_id`),
    FOREIGN KEY (`status_id`) REFERENCES statuses (`status_id`)
);

-- Add data to the vehicles table
INSERT INTO `vehicles` (
    vin_num, spec_id, list_price, status_id, year, color
)
VALUES 
    ('VIN34567', 1, 30000, 1, 2021, 'black'),
    ('VIN78952', 2, 31610, 1, 2022, 'red'),
    ('VIN12365', 3, 30225, 3, 2023, 'blue'),
    ('VIN22222', 1, 36000, 2, 2023, 'silver');


-- Create vehicle_sales object table
CREATE TABLE `vehicle_sales` (
    `order_id` INT AUTO_INCREMENT UNIQUE NOT NULL,
    `customer_id` INT,
    `emp_id` INT,
    `vin_num` VARCHAR(20) NOT NULL,
    `order_date` DATE NOT NULL,
    `sale_price` INT NOT NULL,
    PRIMARY KEY (`order_id`),
    FOREIGN KEY (`customer_id`) REFERENCES customers (`customer_id`) ON DELETE SET NULL,
    FOREIGN KEY (`emp_id`) REFERENCES employees (`emp_id`) ON DELETE SET NULL,
    FOREIGN KEY (`vin_num`) REFERENCES vehicles (`vin_num`)
);

-- Add data to the vehicles table
INSERT INTO `vehicle_sales` (
    customer_id, emp_id, vin_num, order_date, sale_price
)
VALUES 
    (1, 1, 'VIN34567', '2022-10-09', 28000),
    (2, 1, 'VIN78952', '2023-01-08', 30125),
    (3, 2, 'VIN12365', '2023-02-08', 25000),
    (2, 3, 'VIN22222', '2023-03-07', 34000);


SET FOREIGN_KEY_CHECKS=1;
COMMIT;