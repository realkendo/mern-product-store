import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/HomePage";
import Createpage from "./pages/createPage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <Box minH={"100vh"}>
        <NavBar />
        <div style={{ padding: "20px", coor: "#333" }}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/create" element={<Createpage />} />
          </Routes>
        </div>
      </Box>
    </>
  );
}

export default App;
