// Citation for the following code:
// Date: 2023/03/19
// Copied and adapted from OSU GitHub (osu-cs340-ecampus) project (nodejs-starter-app)
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

function deleteCustomer(customerID) {
    let link = '/delete-customer-ajax/';
    let data = {
      customer_id: customerID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(customerID);
      }
    });
  }
  
  function deleteRow(customerID){
      let table = document.getElementById("customers-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == customerID) {
              table.deleteRow(i);
              break;
         }
      }
  }