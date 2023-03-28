// Citation for the following code:
// Date: 2023/03/19
// Copied and adapted from OSU GitHub (osu-cs340-ecampus) project (nodejs-starter-app)
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addCustomerForm = document.getElementById('add-vehicle-specification-form-ajax');

// Modify the objects we need
addCustomerForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputMake = document.getElementById("input-make");
    let inputModel = document.getElementById("input-model");
    let inputFuelType = document.getElementById("input-fuel-type");
    let inputBodyType = document.getElementById("input-body-type");

    // Get the values from the form fields
    let makeValue = inputMake.value;
    let modelValue = inputModel.value;
    let fuelTypeValue = inputFuelType.value;
    let bodyTypeValue = inputBodyType.value;

    // Put our data we want to send in a javascript object
    let data = {
        make: makeValue,
        model: modelValue,
        fuel_type: fuelTypeValue,
        body_type: bodyTypeValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-vehicle-specification-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputMake.value = '';
            inputModel.value = '';
            inputFuelType.value = '';
            inputBodyType.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("vehicle-specifications-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let specIdCell = document.createElement("TD");
    let makeCell = document.createElement("TD");
    let modelCell = document.createElement("TD");
    let fuelTypeCell = document.createElement("TD");
    let bodyTypeCell = document.createElement("TD");

    // Fill the cells with correct data
    specIdCell.innerText = newRow.spec_id;
    makeCell.innerText = newRow.make;
    modelCell.innerText = newRow.model;
    fuelTypeCell.innerText = newRow.fuel_type;
    bodyTypeCell.innerText = newRow.body_type;

    // Add the cells to the row 
    row.appendChild(specIdCell);
    row.appendChild(makeCell);
    row.appendChild(modelCell);
    row.appendChild(fuelTypeCell);
    row.appendChild(bodyTypeCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.spec_id);
    
    // Add the row to the table
    currentTable.appendChild(row);
    
    // Find drop down menu, create a new option, fill data in the option,
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.make + ' ' +  newRow.model;
    option.value = newRow.spec_id;
    selectMenu.add(option);
}

