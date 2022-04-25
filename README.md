# project-bazarraUI
 
## Web App URL
[Bazaara](https://bazaara-342116.web.app/)

## Project Overview
BAZAARA is an app created with the intent of saving people money while shopping for groceries. BAZAARA is a progressive web application that enables store price aggregation especially for groceries as well as featuring live price updating. Users will be able to visit and use BAZAARA on both PC and mobile devices to allow flexible usage. Each user will have their own personal account that they can log into. Once logged in, the user can search for the prices of items individually or in bulk via the ‘grocery list’ feature which saves their selections for future use. The app will let the user know about current prices, trends, and future expectations for the cost of goods. It supports user price reporting via a built-in barcode scanner and photo analysis to enable aggregation of local pricing data. 

## Installation
> not needed for web app, access web page via [Web App Url](#web-app-url)
> This link is compatible on mobile, desktop, and tablets.

## Current Release 
[v3.0.0](https://github.com/Capstone-Projects-2022-Spring/project_bazaaraUI/releases/tag/v3.0.0)

## Testing
[TESTING.md](https://github.com/Capstone-Projects-2022-Spring/project_bazaaraUI/blob/main/TESTING.md)
## Team Members
- Ryan Babala
- Lin Li Oechsle
- Shivani Patel
- Terence Peterson
- Rico Rodriguez

## Linked Repositories 
Backend: [project-bazarra](https://github.com/Capstone-Projects-2022-Spring/project-bazarra)
Scraper: [BAZAARA_Scraper](https://github.com/Capstone-Projects-2022-Spring/project-BAZAARA-scraper)

## Features Implemented
- Traditional login/registration with email and password (with input validation)
- Social media authentication login with Twitter and Google accounts
- Responsive navigation bar that adapts to screen width
- "Money Saved" banner that compares the prices of purchased products from a user's shopping list and computes the user's savings
- Homepage with carousel UI
- Shopping lists page
 - Create and delete shopping lists
 - Add and remove products to shopping list
 - Rename shopping lists
 - View total cost of shopping lists
 - Check off purchased items
- Shopping lists page
 - Displays all products in pages of 10
 - Obtain user's location
 - Estimate user's distance from nearest stores
 - Sort by product name, price, store, distance to store, and weight
 - Functional search bar that shows relevant search results
 - Add products in search page to a shopping list
- Report page
-  Functional barcode scanner that works on both mobile phone cameras and webcams
-  Can accurately capture a product's UPC code
-  User can enter the correct price of the scanned product
-  User can see scanned product price changes reflected in the product search page when searching for the product

## Known Bugs
- Barcode scanner price input does not have input validation
- Shopping list total cost should update to subtract purchased/"checked-off" items
- Logout page does not redirect to login page following logout, instead users are navigated to a white screen
