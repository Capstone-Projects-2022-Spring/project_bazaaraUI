import React from 'react';
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./themes/GlobalStyles";
import theme from "./themes/themes";
import Button from "./Components/Button";
import './App.css';
import { LoginForm } from './Components/Pages/LoginPage/LoginForm';
import { RegisterForm } from './Components/Pages/RegisterPage/RegisterForm';
import  HomeForm  from './Components/Pages/HomePage/HomeForm';
import Navbar from './Components/NavBar/Navbar';
import ShoppingListView from './Components/Pages/ShoppingLists/ShoppingListView';
import { ProductSearch } from './Components/Pages/ProductSearch/ProductSearch';
import ErrorPage from "./Components/Pages/404Page/ErrorPage"
import Logout from './Components/Pages/Logout/logout';
import ProductListParent from './Components/Pages/ProductListParent';

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
    {/* <Navbar/> */}
      <Routes>
        <Route index element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/home" element={<HomeForm />} />
        {/* very messy but ProductSearch is now a child of ShoppingListView so they can access the same list state variable*/}
        <Route path="/lists" element={<ShoppingListView pageIndex={1} />} />
        <Route path="/search" element={<ShoppingListView pageIndex={0} />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}