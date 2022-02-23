import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./GlobalStyles";
import theme from "./themes";

const App = () => {
   return (
      <ThemeProvider theme={theme}>
         <>
            <GlobalStyles />
            <p>Testing themes</p>
         </>
      </ThemeProvider>
   )
}
export default App;