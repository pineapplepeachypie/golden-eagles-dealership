// Citation for the following code:
// Date: 2023/03/19
// Copied and adapted from OSU GitHub (osu-cs340-ecampus) project (nodejs-starter-app)
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let updateVehicleSaleForm = document.getElementById('update-vehicle-sale-form-ajax');

// Modify the objects we need
updateVehicleSaleForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputOrderID = document.getElementById("selectOrder");
    let inputCustomerID = document.getElementById("update-customer-id");
    let inputEmpID = document.getElementById("update-emp-id");
    let inputVinNum = document.getElementById("update-vin-num");
    let inputOrderDate = document.getElementById("update-order-date");
    let inputSalePrice = document.getElementById("update-sale-price");

    // Get the values from the form fields
    let orderIDValue = inputOrderID.value;
    let customerIDValue = inputCustomerID.value;
    let empIDValue = inputEmpID.value;
    let vinNumValue = inputVinNum.value;
    let orderDateValue = inputOrderDate.value;
    let salePriceValue = inputSalePrice.value;


    // Put our data we want to send in a javascript object
    let data = {
        order_id: orderIDValue,
        customer_id: customerIDValue,
        emp_id: empIDValue,
        vin_num: vinNumValue,
        order_date: orderDateValue,
        sale_price: salePriceValue
    }
    console.log(data);
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-vehicle-sale-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            updateRow(xhttp.response, orderIDValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {

            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, orderID) {
    let parsedData = JSON.parse(data);
    console.log(parsedData)
    let table = document.getElementById("vehicle-sales-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == orderID) {

            // Get the location of the row where we found the matching order ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of customer_id, emp_id, vin_num, order_date, and sale_price
            let cu = updateRowIndex.getElementsByTagName("td")[1];
            let em = updateRowIndex.getElementsByTagName("td")[2];
            let vi = updateRowIndex.getElementsByTagName("td")[3];
            let or = updateRowIndex.getElementsByTagName("td")[4];
            let sa = updateRowIndex.getElementsByTagName("td")[5];

            // Reassign cu, em, vi, or, sa to value we updated to
            cu.innerHTML = parsedData[0].Customer; 
            em.innerHTML = parsedData[0].Employee; 
            vi.innerHTML = parsedData[0].VIN; 
            or.innerHTML = parsedData[0].OrderDate; 
            sa.innerHTML = parsedData[0].SalePrice;

          
       }
    }
    // location.reload()
}

