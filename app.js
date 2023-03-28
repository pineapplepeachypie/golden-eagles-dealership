// Citation for the following code:
// Date: 2023/03/19
// Copied and adapted from OSU GitHub (osu-cs340-ecampus) project (nodejs-starter-app)
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// App.js

/*
    SETUP
*/

var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT        = 8228;                 
// Database
var db = require('./database/db-connector')
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/

// Main Page
app.get('/', function(req, res){
    res.render('index');
    });


//Customers

// READ Customers Table
app.get('/customers', function(req, res)
    {  
        let displayCustomers = 
            `SELECT 
                customer_id AS  'CustomerID', first_name AS 'FirstName', last_name AS 'LastName', email AS Email, phone_num AS 'PhoneNumber'
            FROM 
                customers;`;               
        
        db.pool.query(displayCustomers, function(error, rows, fields){  

            res.render('customers', {data: rows});                  // Render the customers.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

// ADD a Customer    
app.post('/add-customer-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let phone_num = parseInt(data.phone_num);
    if (isNaN(phone_num))
    {
        phone_num = ''
    }

    // Create the query and run it on the database
    let addCustomer = `INSERT INTO customers (first_name, last_name, email, phone_num) VALUES ('${data.first_name}', '${data.last_name}', '${data.email}', '${phone_num}')`;
    db.pool.query(addCustomer, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on customers
            let displayCustomers = `SELECT * FROM customers;`;
            db.pool.query(displayCustomers, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});
 
// UPDATE a Customer
app.put('/update-customer-ajax', function(req,res,next){
    let data = req.body;
    
    //Capture NULL values
    let phone_num = parseInt(data.phone_num);
    if (isNaN(phone_num))
    {
        phone_num = ''
    }
    
    let updateCustomer = 
        `UPDATE customers SET first_name = '${data.first_name}', last_name= '${data.last_name}', email = '${data.email}', phone_num= '${phone_num}' WHERE customer_id = '${data.customer_id}';`;

    let displayCustomers = 
        `SELECT * FROM customers WHERE customer_id = '${data.customer_id}'`
    
        // Run the 1st query
        db.pool.query(updateCustomer, function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            // If there was no error, we run our second query and return that data so we can use it to update the Customers
            // table on the front-end
            else
            {
                // Run the second query
                db.pool.query(displayCustomers, function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.send(rows);
                    }
                })
            }
    })});

    
//DELETE a Customer
app.delete('/delete-customer-ajax/', function(req,res,next){
    let data = req.body;
    let customerID = parseInt(data.customer_id);
    let deleteCustomer = `DELETE FROM customers WHERE customer_id = '${data.customer_id}'`;
  
        // Run the 1st query
        db.pool.query(deleteCustomer, [customerID], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }
            else
            {
                // Run the second query
                db.pool.query(deleteCustomer, [customerID], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.sendStatus(204);
                    }
                })
            }
  })});



// Employees

// READ Employees Table
app.get('/employees', function(req, res)
    {  
        let displayemployees = 
            `SELECT 
                emp_id AS 'EmployeeID', first_name AS 'FirstName', last_name AS 'LastName', email AS Email, phone_num AS 'PhoneNumber'
            FROM employees;`;              
        
        db.pool.query(displayemployees, function(error, rows, fields){    // Execute the query

            res.render('employees', {data: rows});                  // Render the employees.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query    
                                                      
    
// ADD an Employee
app.post('/add-employee-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    let addEmployee = 
        `INSERT INTO employees (first_name, last_name, email, phone_num) 
        VALUES ('${data.first_name}', '${data.last_name}', '${data.email}', '${data.phone_num}')`;

    db.pool.query(addEmployee, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on employees
            let displayemployees = `SELECT * FROM employees;`;
            db.pool.query(displayemployees, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
})


// UPDATE an Employee
app.put('/update-employee-ajax', function(req,res,next){
    let data = req.body;
    
    let updateEmployee = 
        `UPDATE employees SET first_name = '${data.first_name}', last_name= '${data.last_name}', email = '${data.email}', phone_num= '${data.phone_num}' WHERE emp_id = '${data.emp_id}';`;

    let displayemployees = 
        `SELECT * FROM employees WHERE emp_id = '${data.emp_id}'`
    
        // Run the 1st query
        db.pool.query(updateEmployee, function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }
            else
            {
                // Run the second query
                db.pool.query(displayemployees, function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.send(rows);
                    }
                })
            }
    })});


//DELETE employee
app.delete('/delete-employee-ajax/', function(req,res,next){
    let data = req.body;
    let empID = parseInt(data.emp_id);
    let deleteEmployee = `DELETE FROM employees WHERE emp_id = '${data.emp_id}'`;
  
        // Run the 1st query
        db.pool.query(deleteEmployee, [empID], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            else
            {
                // Run the second query
                db.pool.query(deleteEmployee, [empID], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.sendStatus(204);
                    }
                })
            }
  })});



// Vehicles

// READ Vehicles Table
app.get('/vehicles', function(req, res)
        {  
        let displayVehicles = 
            `SELECT 
                veh.vin_num AS 'VIN', CONCAT(spc.make, ' ', spc.model) AS Specification, veh.list_price AS 'ListPrice', 
                st.status AS Status, veh.year AS Year, veh.color AS Color
            FROM vehicles veh
            INNER JOIN vehicle_specifications spc
                ON spc.spec_id = veh.spec_id
            INNER JOIN statuses st
                ON st.status_id = veh.status_id;`
        
        let selectVehicleSpecs = `SELECT * FROM vehicle_specifications;`
        let selectStatuses = `SELECT * FROM statuses`

        db.pool.query(displayVehicles, function(error, rows, fields){   
            let vehicle = rows
            db.pool.query(selectVehicleSpecs, function(error, rows, fields){   
                let vehicle_spec = rows
                db.pool.query(selectStatuses, function(error, rows, fields){    
                    let status = rows
               
                    res.render('vehicles', {vehicle: vehicle, vehicle_specifications: vehicle_spec, statuses:status});  
                
                })
            
            })
        
        })                                    
    }); 


// ADD a Vehicle
app.post('/add-vehicle-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    let addVehicle = 
        `INSERT INTO vehicles (vin_num, spec_id, list_price, status_id, year, color) 
        VALUES ('${data.vin_num}', '${data.spec_id}', '${data.list_price}', '${data.status_id}', '${data.year}', '${data.color}')`;

    db.pool.query(addVehicle, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on vehicles
        let displayVehicles = 
                `SELECT 
                    veh.vin_num AS 'VIN', CONCAT(spc.make, ' ', spc.model) AS Specification, veh.list_price AS 'ListPrice', 
                    st.status AS Status, veh.year AS Year, veh.color AS Color
                FROM vehicles veh
                INNER JOIN vehicle_specifications spc
                    ON spc.spec_id = veh.spec_id AND vin_num = '${data.vin_num}'
                INNER JOIN statuses st
                    ON st.status_id = veh.status_id`;

            db.pool.query(displayVehicles, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});



// UPDATE a Vehicle
app.put('/update-vehicle-ajax', function(req,res,next){
    let data = req.body;
    
    let spec_id = parseInt(data.spec_id);
    let status_id = parseInt(data.status_id);
    
    let updateVehicle = 
        `UPDATE vehicles SET spec_id = '${data.spec_id}', list_price = '${data.list_price}', status_id= '${data.status_id}', year = '${data.year}', color = '${data.color}' WHERE vin_num = '${data.vin_num}';`;

    let displayVehicles = 
        `SELECT 
            veh.vin_num AS 'VIN', CONCAT(spc.make, ' ', spc.model) AS Specification, veh.list_price AS 'ListPrice', 
            st.status AS Status, veh.year AS Year, veh.color AS Color
        FROM vehicles veh
        LEFT JOIN vehicle_specifications spc
            ON spc.spec_id = veh.spec_id AND vin_num = '${data.vin_num}'
        LEFT JOIN statuses st
            ON st.status_id = veh.status_id;`;
    
            // Run the 1st query
            db.pool.query(updateVehicle, [spec_id, status_id], function(error, rows, fields){
                if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
                }
                else
                {
                    // Run the second query
                    db.pool.query(displayVehicles, [spec_id, status_id], function(error, rows, fields) {
    
                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        } else {
                            res.send(rows);
                        }
                    })
                }
})});


 
// Vehicle Specifications

// READ Vehicle Specifications Table
app.get('/vehicle_specifications', function(req, res)
    {  
        let displayVehicleSpecs = 
            `SELECT 
                spec_id AS 'SpecificationID', make AS Make, model AS Model, fuel_type AS 'FuelType', body_type AS 'BodyType'
            FROM vehicle_specifications;`;               

        db.pool.query(displayVehicleSpecs, function(error, rows, fields){    

            res.render('vehicle_specifications', {data: rows});                  // Render the vehicle_specifications.hbs file, and also send the renderer
        })                                                      
    }); 

// ADD a Vehicle Specification
app.post('/add-vehicle-specification-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    let addVehicleSpec = 
        `INSERT INTO vehicle_specifications (make, model, fuel_type, body_type) VALUES ('${data.make}', '${data.model}', '${data.fuel_type}', '${data.body_type}');`;

    db.pool.query(addVehicleSpec, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on vehicle_specifications
            let displayVehicleSpecs = `SELECT * FROM vehicle_specifications;`;
            db.pool.query(displayVehicleSpecs, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});



// Vehicle Sales

// READ Vehicle Sales Table
app.get('/vehicle_sales', function(req, res)
        {  
        let displayVehicleSales = 
            `SELECT 
                sal.order_id AS 'OrderID', CONCAT(cus.first_name, ' ', cus.last_name) AS Customer, 
                CONCAT(em.first_name, ' ', em.last_name) AS Employee, CONCAT(veh.vin_num, ' | ', spc.make, ' ', spc.model) AS 'VIN', 
                sal.order_date AS 'OrderDate', sal.sale_price AS 'SalePrice'       
            FROM vehicle_sales sal
            LEFT JOIN customers cus
                ON sal.customer_id = cus.customer_id
            LEFT JOIN employees em
                ON em.emp_id = sal.emp_id
            LEFT JOIN vehicles veh
                ON veh.vin_num = sal.vin_num
            LEFT JOIN vehicle_specifications spc
                ON spc.spec_id = veh.spec_id;`

        let selectCustomers = `SELECT * FROM customers`;
        let selectEmployees = `SELECT * FROM employees`;
        let selectVehicles = 
            `SELECT 
                veh.vin_num, CONCAT(veh.vin_num, ' | ', spc.make, ' ', spc.model) AS 'VIN' 
            FROM vehicles veh 
            LEFT JOIN vehicle_specifications spc 
                ON spc.spec_id = veh.spec_id`;
        let selectVehicleSpecs = `SELECT * FROM vehicle_specifications`;

        db.pool.query(displayVehicleSales, function(error, rows, fields){   
            let vehicle_sales = rows

            db.pool.query(selectCustomers, function(error, rows, fields){   
                let customers = rows
                db.pool.query(selectEmployees, function(error, rows, fields){   
                    let employees = rows
                    db.pool.query(selectVehicles, function(error, rows, fields){   
                        let vehicles = rows
                        db.pool.query(selectVehicleSpecs, function(error, rows, fields){   
                            let vehicle_specifications = rows
                        res.render('vehicle_sales', {vehicle_sales: vehicle_sales, customers: customers, employees: employees, vehicles: vehicles, vehicle_specifications: vehicle_specifications});   
                    })
                })
            })        
        })
    }) 
})        


//ADD a Vehicle Sale
app.post('/add-vehicle-sale-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    let addVehicleSale = 
        `INSERT INTO vehicle_sales (customer_id, emp_id, vin_num, order_date, sale_price) 
        VALUES ('${data.customer_id}', '${data.emp_id}', '${data.vin_num}', '${data.order_date}', '${data.sale_price}')`;

    db.pool.query(addVehicleSale, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on vehicle_sales
            let displayVehicleSales = 
                `SELECT 
                    sal.order_id AS 'OrderID', CONCAT(cus.first_name, ' ', cus.last_name) AS Customer, 
                    CONCAT(em.first_name, ' ', em.last_name) AS Employee, CONCAT(veh.vin_num, ' | ', spc.make, ' ', spc.model) AS 'VIN', 
                    sal.order_date AS 'OrderDate', sal.sale_price AS 'SalePrice'       
                FROM vehicle_sales sal
                LEFT JOIN customers cus
                    ON sal.customer_id = cus.customer_id
                LEFT JOIN employees em
                    ON em.emp_id = sal.emp_id
                LEFT JOIN vehicles veh
                    ON veh.vin_num = sal.vin_num
                LEFT JOIN vehicle_specifications spc
                    ON spc.spec_id = veh.spec_id;`;

            db.pool.query(displayVehicleSales, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    console.log(rows)
                    res.send(rows);
                }
            })
        }
    })
});


//UPDATE a Vehicle Sale
app.put('/update-vehicle-sale-ajax', function(req,res,next){
    let data = req.body;
    
    // NULLable value update
    let customer_id = parseInt(data.customer_id);
    if (data.customer_id === 'NULL')
    {
        customer_id = null
    }
    else {
        customer_id = `'${data.customer_id}'`;
    }

    let emp_id = parseInt(data.emp_id);
    if (data.emp_id === 'NULL')
    {
        emp_id = null
    }
    else {
        emp_id = `'${data.emp_id}'`;
    }
    let vin_num = parseInt(data.vin_num);
    
    let displayVehicleSales = 
        `SELECT 
            sal.order_id AS 'OrderID', CONCAT(cus.first_name, ' ', cus.last_name) AS Customer, 
            CONCAT(em.first_name, ' ', em.last_name) AS Employee, CONCAT(veh.vin_num, ' | ', spc.make, ' ', spc.model) AS 'VIN', 
            sal.order_date AS 'OrderDate', sal.sale_price AS 'SalePrice'       
        FROM vehicle_sales sal
        LEFT JOIN customers cus
            ON sal.customer_id = cus.customer_id
        LEFT JOIN employees em
            ON em.emp_id = sal.emp_id
        LEFT JOIN vehicles veh
            ON veh.vin_num = sal.vin_num
        LEFT JOIN vehicle_specifications spc
            ON spc.spec_id = veh.spec_id
            WHERE order_id = '${data.order_id}';`

    let updateVehicleSale = 
        `UPDATE vehicle_sales SET customer_id = ${customer_id}, emp_id = ${data.emp_id}, vin_num = '${data.vin_num}', order_date = '${data.order_date}', sale_price = '${data.sale_price}' WHERE order_id = '${data.order_id}';`;
    
            // Run the 1st query
            db.pool.query(updateVehicleSale, [customer_id, emp_id, vin_num], function(error, rows, fields){
                if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
                }
                else
                {
                    db.pool.query(displayVehicleSales, [customer_id, emp_id, vin_num], function(error, rows, fields) {
    
                        if (error) {
                            console.log(error);
                            res.sendStatus(400);

                        } else {
                            console.log(rows)
                            res.send(rows);

                        }
                    })
                }
})});


// DELETE a Vehicle Sale
app.delete('/delete-vehicle-sale-ajax/', function(req,res,next){
    let data = req.body;
    let orderID = parseInt(data.order_id);
    let deleteOrder = `DELETE FROM vehicle_sales WHERE order_id = '${orderID}';`;
  
        // Run the 1st query
        db.pool.query(deleteOrder, [orderID], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }
            else
            {
                db.pool.query(deleteOrder, [orderID], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.sendStatus(204);
                    }
                })
            }
  })});


    
// Statuses

// READ Statuses Table
app.get('/statuses', function(req, res){
    let displayStatuses = 
        `SELECT 
            status_id AS 'StatusID', status AS Status
        FROM statuses;`;

    db.pool.query(displayStatuses, function(errors, rows, fields){
        res.render('statuses', {data: rows});
    })
});


// ADD a Status    
app.post('/add-status-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    let addStatus = `INSERT INTO statuses (status) VALUES ('${data.status}');`;
    db.pool.query(addStatus, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on statuses
            let displayStatuses = `SELECT * FROM statuses;`;

            db.pool.query(displayStatuses, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

  

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});