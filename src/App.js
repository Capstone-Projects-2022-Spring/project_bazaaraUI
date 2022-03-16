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

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route index element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/home" element={<HomeForm />} />
        <Route path="/shoppinglists" element={<ShoppingListView />} />
        <Route path="/search" element={<ProductSearch />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
