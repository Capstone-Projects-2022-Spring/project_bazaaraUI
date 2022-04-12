# ACCEPTANCE TESTING
paths: / | /register | /home | /lists | /search | /logout
## User Account Management Tests
expectations: facebook icon is currently disabled

additional: **you can still navigate to home page by hardcoding /home path in url... restrictions are not yet set since still debugging core features** 🕺

##Register
1. open site
2. navigate to register page
3. Register Via. Account Username and password
4. Navigate to home page

### Failed register
1. open site 
2. navigate to register page
3. register using the same account email as previous
4. observe failed registration, account already exists

### Login
1. Navigate to login page
2. Login using registered user credentials
3. test invalid password does not work
4. test that invalid email type does not work
5. test that login credentials from previously registered account works
6. observe navigation to home page

### Login with social account
1. Navigate to login page
2. Select icon for Google and/or Twitter
3. observe popup-window to for respective account
4. Login using your gmail/twitter account
5. observe navigation to home page

### Logout 
1. navigate to any page containing the nav bar
2. click "logout"
3. click "go to login page"
4. observe being bought back to login page

## Grocery Lists Management Tests

expectations: created list will delete upon refresh due to no saved state on this deployment

### Shopping Lists Management 
1. navigate to shopping lists
2. click "Create New List"
3. enter shopping list name
4. click "add"
5. click the name of the newly created list 
6. observe empty product list
7. click elipses
8. click "Delete List"
9. observe deleted list

### Deleting products from list
1. navigate to shopping lists page
2. view products and shopping list
3. click elipses
4. delete product from list by clicking "remove items"
5. select "remove from list" at bottom of product component
6. observe accurate change in list total cost/value and removal of product component

### Adding products to list
1. navigate to shopping lists page
2. select desired list (to add products to)
3. click "Add a Product" button, which navigates you to Search page
4. search for items to add to list
5. click item and observe it's addition to your list with "item add to ..." prompt
6. select purple button and choose a different list
7. observe updated list name contained in purple button
8. select more items from table to add to a different list
9. navigate back to lists page and view newly added products in each list with accurate total list value

### Rename list
1. navigate to shopping lists page
2. select desired list
3. select elipses
4. select "rename list"
5. type in repeated list name
6. observe "no duplicates" prompty
7. repeat previous steps using a new name
8. observe list name change
9. navigate to search page
10. select purple button for "adding products To:
11. observe renamed list as suggestion in modal

## Product Search Tests

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


## Report
expectations: Barcode feature is still being worked on and does not consistently snap the correct code if not algined well. The consistency on mobile is worse than desktop.

Additonal: You must enable camera (desktop or mobile) to test this feature. Additonally, use an item that contains both the barcode and it's human readable number

### Barcode reporting
1. navigate to Report page
2. select "click here to scan" button
3. enable webcam
4. observe camera component between "click here to scan" and "capture" buttons
5. with handheld product, hold barcode top-down facing the camera (under good lighting)
6. keep adjusting the angle until the upc code is filled correctly 
7. select capture when correct
8. manually enter the item price
9. select report
10. observe confirmation message

## UI Tests
1. navigate to each respective page on both mobile (if not mobile, shrink width of desktop) and desktop
2. observe collapsable navbar on mobile width
3. observe stacked components on mobile width (when appropriate, i.e. lists page)
