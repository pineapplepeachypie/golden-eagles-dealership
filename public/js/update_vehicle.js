// Citation for the following code:
// Date: 2023/03/19
// Copied and adapted from OSU GitHub (osu-cs340-ecampus) project (nodejs-starter-app)
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let updateVehicleForm = document.getElementById('update-vehicle-form-ajax');

// Modify the objects we need
updateVehicleForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputVinNum = document.getElementById("selectVinNum");
    let inputSpecID = document.getElementById("update-spec-id");
    let inputListPrice = document.getElementById("update-list-price");
    let inputStatusID = document.getElementById("update-status-id");
    let inputYear = document.getElementById("update-year");
    let inputColor = document.getElementById("update-color");

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
    console.log(data);
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-vehicle-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, vinNumValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, vinNum){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("vehicles-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == vinNum) {

            // Get the location of the row where we found the matching vin_num
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of specification, list price, status, year, and color
            let sp = updateRowIndex.getElementsByTagName("td")[1];
            let lp = updateRowIndex.getElementsByTagName("td")[2];
            let st = updateRowIndex.getElementsByTagName("td")[3];
            let yr = updateRowIndex.getElementsByTagName("td")[4];
            let co = updateRowIndex.getElementsByTagName("td")[5];

            // Reassign sp, lp, st, yr, and co to value we updated to
            sp.innerHTML = parsedData[0].Specification; 
            lp.innerHTML = parsedData[0].ListPrice; 
            st.innerHTML = parsedData[0].Status; 
            yr.innerHTML = parsedData[0].Year; 
            co.innerHTML = parsedData[0].Color;
       }
    }
    //Reload the window
    location.reload();
}

