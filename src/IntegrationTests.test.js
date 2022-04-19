import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import { mount } from 'enzyme/build';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import ShoppingListView from './Components/Pages/ShoppingLists/ShoppingListView'
import ShoppingListDisplay from './Components/Pages/ShoppingLists/ShoppingListDisplay'
import ShoppingListSelection from './Components/Pages/ShoppingLists/ShoppingListSelection'
import Product from './Components/Pages/ShoppingLists/Product'
import ListManagementDropdown from './Components/Pages/ShoppingLists/ListManagementDropdown'
import { ShoppingListCollection } from './Components/Pages/ShoppingLists/ShoppingList';
import App from './App'
import { getByPlaceholderText } from '@testing-library/react';
import { Simulate } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import Report from './Components/Pages/Report/index'
import HomeForm from './Components/Pages/HomePage/HomeForm'
import Navbar from './Components/NavBar/Navbar'
import ProductSearch from './Components/Pages/ProductSearch/ProductSearch';

Enzyme.configure({ adapter: new Adapter() });

jest.mock("./Components/Pages/HomePage/HomeForm");

// use case 1
describe('Login/Register', () => {
    test("A user wants to log into BAZAARA to have access to all app features.", async () => {
        jest
            .spyOn(window, 'fetch')
            .mockResolvedValue();
    
        render(<App />);
    
        // component renders empty email and password fields
        const emailField = screen.getByRole('textbox', { name: ""});
        expect(emailField).toHaveValue('');
    
        const passwordField = screen.getByRole('textbox', {name: ""});
        expect(passwordField).toHaveValue('');
    
        // component renders submit button
        const button = screen.getByText('Log in');
        expect(button).not.toBeDisabled();
        
        // component successfully fills out login form
        fireEvent.change(emailField, { target: {value: 'linli@temple.edu'} });
        fireEvent.change(passwordField, { target: {value: 'test1234%'} });
        fireEvent.click(button);


    })
})

// use case 2
test('A user wants to add the least expensive products to their grocery shopping list.', async () => {




})
//ShoppingListView pageIndex={0}

// use case 3
test('A user wants to see how much money they have saved by using this app. ', async () => {
    // ensuring homepage renders
    shallow(<HomeForm />);

})

// use case 4
test('A user wants to search for an individual product and see which store is most cost effective for that item.', async () => {

    

})

// use case 5
test('A user notices a price discrepancy between a product’s reported price on BAZAARA and in-store and wants to report this difference.', async () => {
    render(<Report />);

    expect(screen.getByText("Search for a post by its ID")).toBeInTheDocument();

    //const userPrice = screen.getByRole('textbox', { name: ""});

})