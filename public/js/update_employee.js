// Citation for the following code:
// Date: 2023/03/19
// Copied and adapted from OSU GitHub (osu-cs340-ecampus) project (nodejs-starter-app)
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let updateEmployeeForm = document.getElementById('update-employee-form-ajax');

// Modify the objects we need
updateEmployeeForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFullName = document.getElementById("selectEmployee");
    let inputFirstName = document.getElementById("update_first_name");
    let inputLastName = document.getElementById("update_last_name");
    let inputEmail = document.getElementById("update_email");
    let inputPhoneNum = document.getElementById("update_phone_num");

    // Get the values from the form fields
    let fullNameValue = inputFullName.value;
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let emailValue = inputEmail.value;
    let phoneNumValue = inputPhoneNum.value;


    // Put our data we want to send in a javascript object
    let data = {
        emp_id: fullNameValue,
        first_name: firstNameValue,
        last_name: lastNameValue,
        email: emailValue,
        phone_num: phoneNumValue
    }
    console.log(data);
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-employee-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, fullNameValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, empID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("employees-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == empID) {

            // Get the location of the row where we found the matching employee ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of first_name, last_name, email, and phone_num values
            let fn = updateRowIndex.getElementsByTagName("td")[1];
            let ln = updateRowIndex.getElementsByTagName("td")[2];
            let e = updateRowIndex.getElementsByTagName("td")[3];
            let pn = updateRowIndex.getElementsByTagName("td")[4];

            // Reassign fn,ln,e,pn to value we updated to
            fn.innerHTML = parsedData[0].first_name; 
            ln.innerHTML = parsedData[0].last_name; 
            e.innerHTML = parsedData[0].email; 
            pn.innerHTML = parsedData[0].phone_num; 
       }
    }
}

