# ACCEPTANCE TESTING

## User Account Creation
1. open site
2. select desired social account
3. Register Via. Account Username
4. Navigate to home

expectations: User should expect not to see any real functionality for preserving state according to account details

additional: navigate to home page by hardcoding /home path in url... authentication still in progress 🕺

## Grocery Lists Management 

expectations: created list will delete upon refresh

### Shopping Lists Creation
1. navigate to shopping lists
2. click "Create New List"
3. enter shopping list name
4. click "add"
5. click the name of the newly created list 
6. observe empty product list

### Deleting products from list
1. navigate to shopping lists
2. view prodcuts and shopping list
4. delete product from list by clicking "remove from list" within product
4. delete multiple products by selecting checkboxes and clicking "remove items", then refresh page

### Adding products to list
1. navigate to shopping lists
2. select desired list to add products to
3. click "Add a Product" button, which navigates you to Search page
4. search for items to add to list
5. click item and observe it's addition to your list with "item add to ..." prompt
6. select purple button and choose different list
7. observe updated list name contained in purple button
8. select more items from table to add to list
9. navigate back to lists page and view newly added products in each list

## Product Search

### Product scraping pagination
- only items: Orange, Apple, Cereal are available for search
1. navigate to search page
2. observe suggested items ranked in table
3. observe more paginated selections by navigating to different table page 
<img width="631" alt="Screen Shot 2022-03-29 at 10 47 01 AM" src="https://user-images.githubusercontent.com/54731009/160638982-6f345e99-494b-44ef-8b85-6996377947bb.png">

### Product search filtering
- only items: Orange, Apple, Cereal are available for search
1. navigate to search page
4. select search bar to type
5. filter for default product by typing any length prefix of provided product name
6. sort for item by price, store or weight

expectations: User should be able to search and sort default products mentioned above



