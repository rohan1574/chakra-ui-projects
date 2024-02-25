
import { Route, Routes } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme";
import Layout from "./pages/Layout";
import System from "./pages/System";
import Configuration from "./pages/Configuration";
import PeopleManagement from "./pages/PeopleManagement";



function App() {
  

  return (
    <>


      <ChakraProvider theme={theme}>
      <Routes>
          
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<PeopleManagement />} />
            <Route path="/system" element={<System />} />
            <Route path="/config" element={<Configuration />} />
           
          </Route>
        </Routes>

      </ChakraProvider>
    
       
     
    </>
  )
}

export default App
