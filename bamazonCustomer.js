var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require('colors');
var table = require('cli-table');
var connection = require('connection');



var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "#1Haepyongdae",
  database: "bamazonDB"
});


connection.connect(function (err) {
  if (err) throw err;
  start();
});



function start() {
	connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;


    console.log("==================================");
    console.log("       WELCOME!");
    console.log("==================================");


    var table = new Table({
      head: ['ID'.red, 'PRODUCT NAME'.red, 'DEPARTMENT'.red, 'PRICE'.red, 'STOCK QUANTITY'.red]
    });

    for (var i = 0; i < res.length; i++) {
      table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price.toFixed(2), res[i].stock_quantity]);
    }

    console.log(table.toString());
    shopProducts();
  });
  

  function shopProducts() {
    inquirer.prompt([{
      name: "Welcome!",
      message: "Pssst. Wanna buy some stuff? [YES]/[NO]",
      type: "input",

    }]).then(function (answer) {
      if (answer.welcome.toUpperCase() === 'YES') {
        questions();
      } else {
        console.log("What's wrong? You a narc or something?! We're kidding - have a great day!".yellow);
        process.exit(0);
      }
    });
  }

function questions() {
  inquirer.prompt([{
    name: "userId",
    type: "input",
    message: "What are you looking to get today, greeneyes?",
    validate: function (value) {
      if (isNan(value) === false) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    name: "userQty",
    type: "input",
    message: "How much you buying? Units are little baggies that don't look sketch at all...",
    validate: function (value) {
      if (isNan(value) === false) {
        return true;
      } else {
        return false;
      }
    }
  }]).then(function (answer) {

    var userItem = answer.userId;
    var userQty = answer.userQty;
    connection.query('SELECT * FROM products WHERE ?', {
      item_id: answer.userId
    },
    function (err, results) {
      if (err) throw err;

      if (userQty > results[0].stock_quantity) {
        console.log("\n SORRY. FRESH OUT OF THAT. MAYBE TRY SOMETHING ELSE?".purple);
        connection.end();
      } else { 
        var totalCost = userQty * results[0].price;
        var newQty = results[0].stock_quantity - userQty;
        var itemId = results[0].item_id;

        console.log("\n===============================================");
        console.log("\n LUCKY YOU. WE GOT THAT!".yellow);
        console.log("\n Order: " + userQty + " " + results[0].product_name + ".");
        console.log("\n Total Cost: " + userQty + " x " + results[0].price + " = $ " + totalCost);
        console.log("\n BUCKS LITTLE MAN. PUT THAT MONEY IN MY HAND....");
        console.log("\n===============================================");

        inquirer
        .prompt([{
          type: "confirm",
          message: "Confirm Order:",
          name: "confirmOrder",
          default: true
        }]).then(function (confirmResponse) {
          if (confirmResponse.confirmOrder) {
            connection.query('UPDATE products SET ? WHERE ?', [{
              stock_quantity: newQty
            }, {
              item_id: itemId
            }],
            function (err, res) {
              if (err) throw err;

              console.log("\n=============================================");
              console.log("\n The charge is " + totalCost + " dollars for your goods.")
              console.log("\n THANKS FOR YOUR ORDER TODAY YOU FREEDOM FIGHTER.");
              console.log("\n=============================================");
              connection.end();
            }
            });
          } else {
              console.log("\n==============================================");
              console.log("\n ORDER HAS BEEN CANCELLED. YOU REALLY LET ME DOWN.");
              console.log("\n===============================================");
              start();
            }
          });
        }
      }
    );
  });
}
}






