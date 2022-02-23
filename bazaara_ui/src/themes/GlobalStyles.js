import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
   body {
     font-family: "Roboto", monospace, Helvetica;
     font-size: 48px;
     background: ${({ theme }) => theme.background};
     color: ${({ theme }) => theme.color};
     text-align: center;
     transition: all 0.50s linear; 
  }
`