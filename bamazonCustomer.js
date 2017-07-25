const Promises = require('bluebird');
// const MySQL = require('mysql');
const MySQL = Promises.promisifyAll(require('mysql'));
const Inquirer = require('inquirer');
// This special code is required to turn the MySQL methods into promises
Promises.promisifyAll(require("mysql/lib/Connection").prototype);
Promises.promisifyAll(require("mysql/lib/Pool").prototype);

// Connect to MySQL
var connection = MySQL.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "Stacked808",
	database: "bamazon"
});

const questions = [
	{
		type : "input",
		name : "id",
		message: "What's the ID of the item you would like to buy?"
	},
	{
		type : "input",
		name : "units",
		message : "How many units would you like to buy?"
	}	
];

let prodQuery = "SELECT * FROM products";

let updateQuery = "UPDATE products SET stock_quantity = ? WHERE item_id = ?";

connection.connectAsync()
			.then( () => connection.queryAsync(prodQuery) )
			.then( data => {
				var holdReturn = data;
				var newQuantity = undefined;
			console.log(JSON.stringify(holdReturn, null, 2));	

			Inquirer.prompt(questions)
			.then( (data) => {
				console.log(data);
				
				for(x in holdReturn){
					console.log(holdReturn[x].item_id, data.id);
					
					if(holdReturn[x].item_id == data.id) {
						console.log(holdReturn[x].item_id);
						if (holdReturn[x].stock_quantity >= data.units) {
							console.log("We have that in stock!")
							newQuantity = holdReturn[x].stock_quantity - data.units;
							var display = holdReturn[x].price * data.units;
							console.log("Your total is $" + display);
						} else {
							console.log("Insufficient quantity!");
						}	
					}
				}

			connection.queryAsync(updateQuery, [newQuantity , data.id])
			.then( data => console.log(JSON.stringify(data, null, 2)) )
			.then( () => connection.endAsync() )
			.catch( ( err ) => { throw err; } );
			});

			})
			

			.catch( ( err ) => { throw err; } );

function updateInventory( id ){
		return this.connection
				.queryAsync("UPDATE products SET stock_quantity = stock_quantity - 1 WHERE id = ?", [ id ])
				.then( () => { 
					this.connection.end();
					console.log("stock up!");
				} )
				.catch( err => { throw err });	;;
	}			



