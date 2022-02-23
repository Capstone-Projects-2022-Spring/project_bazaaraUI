import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./themes/GlobalStyles";
import theme from "./themes/themes";

const App = () => {
   return (
      <ThemeProvider theme={theme}>
         <>
          <GlobalStyles />
              <p>BAZAARA</p>


         </>
      </ThemeProvider>
   )
}
export default App;