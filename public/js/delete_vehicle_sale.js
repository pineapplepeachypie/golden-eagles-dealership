// Citation for the following code:
// Date: 2023/03/19
// Copied and adapted from OSU GitHub (osu-cs340-ecampus) project (nodejs-starter-app)
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

function deleteOrder(orderID) {
    let link = '/delete-vehicle-sale-ajax/';
    let data = {
      order_id: orderID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(orderID);
      }
    });
  }
  
  function deleteRow(orderID){
      let table = document.getElementById("vehicle-sales-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == orderID) {
              table.deleteRow(i);
              break;
         }
      }
  }