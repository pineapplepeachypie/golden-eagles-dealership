-- Group 26
-- Victoria Sok & Guyllian Dela Rosa
-- Project Step 3 Final

-- Query for add a new input functionality with colon : character being used to 
-- denote the variables that will have data from the backend programming language

-------------------------------------------------------------------------------------------------
-- Create 
-- Add a new customer
INSERT INTO `customers` (
    first_name, last_name, email, phone_num
)
VALUES 
    (:first_name_input, :last_name_input, :email_input, :phone_num_input);

-- Add a new employee
INSERT INTO `employees` (
    first_name, last_name, email, phone_num
)
VALUES 
    (:first_name_input, :last_name_input, :email_input, :phone_num_input);

-- Add a new veichle
INSERT INTO `vehicles` (
    vin_num, spec_id, list_price, status_id, year, color
)
VALUES 
    (:vin_num_input, :spec_id_input, :list_price_input, :status_id_input, :year_input, :color_input)

-- Add a new vehicle specification
INSERT INTO `vehicle_specifications` (
    make, model, fuel_type, body_type
)
VALUES
    (:make_input, :model_input, :fuel_type_input, :body_type_input);

-- Add a new vehicle sales record
INSERT INTO `vehicle_sales` (
    customer_id, emp_id, vin_num, order_date, sale_price
)
VALUES 
    (:customer_id_input, :emp_id_input, :vin_num_input, :order_date_input, :sale_price_input);

-- Add a new status
INSERT INTO `statuses` (status)
VALUES 
    (:status_input);

-------------------------------------------------------------------------------------------------
-- Read
-- Display contents of customers table
SELECT 
    customer_id AS  'CustomerID', first_name AS 'FirstName', last_name AS 'LastName', email AS Email, phone_num AS 'PhoneNumber'
FROM customers;

-- Display contents of employees table
SELECT emp_id AS 'EmployeeID', first_name AS 'FirstName', last_name AS 'LastName', email AS Email, phone_num AS 'PhoneNumber'
FROM employees;

-- Display contents of vehicles table
SELECT 
    veh.vin_num AS 'VIN', CONCAT(spc.make, ' ', spc.model) AS Specification, veh.list_price AS 'ListPrice', 
    st.status AS Status, veh.year AS Year, veh.color AS Color
FROM vehicles veh
INNER JOIN vehicle_specifications spc
    ON spc.spec_id = veh.spec_id
INNER JOIN statuses st
    ON st.status_id = veh.status_id;

-- Display contents of vehicle_specifications table
SELECT spec_id AS 'SpecificationID', make AS Make, model AS Model, fuel_type AS 'FuelType', body_type AS 'BodyType'
FROM vehicle_specifications;

-- Display contents of vehicle_sales table
SELECT 
    sal.order_id AS 'OrderID', CONCAT(cus.first_name, ' ', cus.last_name) AS Customer, 
    CONCAT(em.first_name, ' ', em.last_name) AS Employee, CONCAT(veh.vin_num, ' | ', spc.make, ' ', spc.model) AS 'VIN', 
    sal.order_date AS 'OrderDate', sal.sale_price AS 'SalePrice'       
FROM vehicle_sales sal
INNER JOIN customers cus
    ON sal.customer_id = cus.customer_id
INNER JOIN employees em
    ON em.emp_id = sal.emp_id
INNER JOIN vehicles veh
    ON veh.vin_num = sal.vin_num
INNER JOIN vehicle_specifications spc
    ON spc.spec_id = veh.spec_id;

-- Display contents of statuses table
SELECT status_id AS 'StatusID', status AS Status
FROM statuses;

-- Get all status IDs and status to populate the status dropdown in vehicles table
SELECT status_id, status AS Status FROM statuses;

-- Get all customer IDs and customer's full name to populate the customer dropdown in vehicle_sales table
SELECT customer_id, CONCAT(first_name, ' ', last_name) AS 'Customer' FROM customers;

-- Get all employee IDs and employee's full name to populate the employee dropdown in vehicle_sales table
SELECT emp_id, CONCAT(first_name, ' ', last_name) AS Employee FROM employees;

-- Get all spec IDs to populate the vehicle specification dropdown in vehicles table
SELECT spec_id, CONCAT(make, ' ', model) AS Spec FROM vehicle_specifications;

-- Get all vin numbers to populate the vin number dropdown in vehicle_sales table
SELECT vin_num, CONCAT(veh.vin_num, '|', spc.make, ' ', spc.model) AS VIN 
FROM vehicles veh
INNER JOIN vehicle_specifications spc
    ON spc.spec_id = veh.spec_id;


-------------------------------------------------------------------------------------------------
-- Update
-- Update a customer record with new information
UPDATE customers
SET first_name = :first_name_input, last_name= :last_name_input, email = :email_input, phone= :phone_input
WHERE customer_id = :customer_id_from_the_update_form;

-- Update an employee record with new information
UPDATE employees
SET first_name = :first_name_input, last_name= :last_name_input, email = :email_input, phone= :phone_input
WHERE emp_id = :emp_id_from_the_update_form;

-- Update a vehicle record with new information
UPDATE vehicles
SET spec_id = :spec_id_input, list_price = :list_price_input, status_id = :status_id_input, year = :year_input, color = :color_input
WHERE vin_num = :vin_num_from_the_update_form;

-- Update a vehicle sales record with new information
UPDATE vehicle_sales
SET customer_id = :customer_id_input, emp_id = :emp_id_input, vin_num = :vin_num_input, order_date = :order_date_input, sale_price = :sale_price_input
WHERE order_id = :order_id_from_the_update_form;


-------------------------------------------------------------------------------------------------

-- Delete 
-- Delete a customer
DELETE FROM customers 
WHERE customer_id = :customer_id_selected_from_browse_customers_page;

-- Delete an employee
DELETE FROM employees 
WHERE emp_id = :emp_id_selected_from_browse_employees_page;

-- Delete a vehicle sale
DELETE FROM vehicle_sales 
WHERE order_id = :order_id_selected_from_browse_vehicle_sale_page;
