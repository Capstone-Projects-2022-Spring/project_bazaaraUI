import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./themes/GlobalStyles";
import theme from "./themes/themes";
import Button from "./components/Button";

const App = () => {
   return (
      <ThemeProvider theme={theme}>
         <>
          <GlobalStyles />
              <p>BAZAARA</p>
<Button>here</Button>

         </>
      </ThemeProvider>
   )
}
export default App;