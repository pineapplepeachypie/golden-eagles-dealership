// Citation for the following code:
// Date: 2023/03/19
// Copied and adapted from OSU GitHub (osu-cs340-ecampus) project (nodejs-starter-app)
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addVehicleForm = document.getElementById('add-vehicle-form-ajax');

// Modify the objects we need
addVehicleForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputVinNum = document.getElementById("input-vin-num");
    let inputSpecID = document.getElementById("input-spec-id");
    let inputListPrice = document.getElementById("input-list-price");
    let inputStatusID = document.getElementById("input-status-id");
    let inputYear = document.getElementById("input-year");
    let inputColor = document.getElementById("input-color");

    // Get the values from the form fields
    let vinNumValue = inputVinNum.value;
    let specIDValue = inputSpecID.value;
    let listPriceValue = inputListPrice.value;
    let statusIDValue = inputStatusID.value;
    let yearValue = inputYear.value;
    let colorValue = inputColor.value;

    // Put our data we want to send in a javascript object
    let data = {
        vin_num: vinNumValue,
        spec_id: specIDValue,
        list_price: listPriceValue,
        status_id: statusIDValue,
        year: yearValue,
        color: colorValue
    }
    console.log(data)
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-vehicle-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputVinNum.value = '';
            inputSpecID.value = '';
            inputListPrice.value = '';
            inputStatusID.value = '';
            inputYear.value = '';
            inputColor.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from vehicles
addRowToTable = (data) => {
    console.log(data);

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("vehicles-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let vinNumCell = document.createElement("TD");
    let specIDCell = document.createElement("TD");
    let listPriceCell = document.createElement("TD");
    let statusIDCell = document.createElement("TD");
    let yearCell = document.createElement("TD");
    let colorCell = document.createElement("TD");

    // Fill the cells with correct data
    vinNumCell.innerText = newRow.VIN;
    specIDCell.innerText = newRow.Specification;
    listPriceCell.innerText = newRow.ListPrice;
    statusIDCell.innerText = newRow.Status;
    yearCell.innerText = newRow.Year;
    colorCell.innerText = newRow.Color;

    // Add the cells to the row 
    row.appendChild(vinNumCell);
    row.appendChild(specIDCell);
    row.appendChild(listPriceCell);
    row.appendChild(statusIDCell);
    row.appendChild(yearCell);
    row.appendChild(colorCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.vin_num);
    
    // Add the row to the table
    currentTable.appendChild(row);
    
    // Find drop down menu, create a new option, fill data in the option,
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("selectVinNum");
    let option = document.createElement("option");
    option.text = newRow.VIN;
    option.value = newRow.VIN;
    selectMenu.add(option);
}

