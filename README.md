# bamazon
Running bamazonCustomer.js in node first displays all items available for sale including the ids, names, and prices of each product.
 
The app then prompts users with two messages:
  The first question asks the user for the ID of the product they would like to buy.
  The second question asks how many units of the product they would like to buy.

Once the customer has placed the order, the application checks if bamazon has enough of the product to meet the customer's request.

If not, the app logs "Insufficient quantity!", and then prevent the order from going through.

However, if bamazon does have enough of the product, the customer's order is fulfilled.

When an order is fullfilled, the SQL database updates to reflect the remaining quantity in stock.
Once the update goes through, the customer is shown the total cost of their purchase.
