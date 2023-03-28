// Citation for the following code:
// Date: 2023/03/19
// Copied and adapted from OSU GitHub (osu-cs340-ecampus) project (nodejs-starter-app)
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addVehicleSaleForm = document.getElementById('add-vehicle-sale-form-ajax');

// Modify the objects we need
addVehicleSaleForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCustomerID = document.getElementById("input-customer-id");
    let inputEmpID = document.getElementById("input-emp-id");
    let inputVinNum = document.getElementById("input-vin-num");
    let inputOrderDate = document.getElementById("input-order-date");
    let inputSalePrice = document.getElementById("input-sale-price");

    // Get the values from the form fields
    let customerIDValue = inputCustomerID.value;
    let empIDValue = inputEmpID.value;
    let vinNumValue = inputVinNum.value;
    let orderDateValue = inputOrderDate.value;
    let salePriceValue = inputSalePrice.value;

    // Put our data we want to send in a javascript object
    let data = {
        customer_id: customerIDValue,
        emp_id: empIDValue,
        vin_num: vinNumValue,
        order_date: orderDateValue,
        sale_price: salePriceValue
    }
    console.log(data)
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-vehicle-sale-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputCustomerID.value = '';
            inputEmpID.value = '';
            inputVinNum.value = '';
            inputOrderDate.value = '';
            inputSalePrice.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from vehicle sales
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("vehicle-sales-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let orderIDCell = document.createElement("TD");
    let customerIDCell = document.createElement("TD");
    let empIDCell = document.createElement("TD");
    let vinNumCell = document.createElement("TD");
    let orderDateCell = document.createElement("TD");
    let salePriceCell = document.createElement("TD");

    // let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    orderIDCell.innerText = newRow.OrderID;
    customerIDCell.innerText = newRow.Customer;
    empIDCell.innerText = newRow.Employee;
    vinNumCell.innerText = newRow.VIN;
    orderDateCell.innerText = newRow.OrderDate;
    salePriceCell.innerText = newRow.SalePrice;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteCustomer(newRow.order_id);
    };

    // Add the cells to the row 
    row.appendChild(orderIDCell);
    row.appendChild(customerIDCell);
    row.appendChild(empIDCell);
    row.appendChild(vinNumCell);
    row.appendChild(orderDateCell);
    row.appendChild(salePriceCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.order_id);
    
    // Add the row to the table
    currentTable.appendChild(row);
    
    // Find drop down menu, create a new option, fill data in the option,
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("selectOrder");
    let option = document.createElement("option");
    option.text = newRow.OrderID;
    option.value = newRow.OrderID;
    selectMenu.add(option);

    //Reload the window
    location.reload();
}


