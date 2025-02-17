import { Box, Flex } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/HomePage";
import Createpage from "./pages/createPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Box bg="gray.100">
        <Flex direction={"column"} minHeight={"100vh"}>
          <NavBar />
          <div style={{ padding: "20px", color: "#333" }}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/create" element={<Createpage />} />
            </Routes>
          </div>
          <Footer />
        </Flex>
      </Box>
    </>
  );
}

export default App;
