// Citation for the following code:
// Date: 2023/03/19
// Copied and adapted from OSU GitHub (osu-cs340-ecampus) project (nodejs-starter-app)
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

function deleteEmployee(empID) {
    let link = '/delete-employee-ajax/';
    let data = {
      emp_id: empID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(empID);
      }
    });
  }
  
  function deleteRow(empID){
      let table = document.getElementById("employees-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == empID) {
              table.deleteRow(i);
              break;
         }
      }
  }