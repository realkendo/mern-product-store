import { Box, Flex, useColorMode } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/HomePage";
import Createpage from "./pages/createPage";
import SignIn from "./pages/SignIn";
import ChatPage from "./pages/ChatPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { colorMode } = useColorMode();
  return (
    <Box
      bg={colorMode === "light" ? "gray.100" : "blue.900"}
      color={colorMode === "light" ? "gray.900" : "gray.100"}
      minHeight="100vh"
      transition="background 0.3 ease"
    >
      <Flex direction="column" minHeight="100vh">
        <NavBar />

        {/* Main Content - Pushes Footer Down */}
        <Box flex="1" p={5}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/signin" element={<SignIn />} />

            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <Createpage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Box>

        <Footer />
      </Flex>
    </Box>
  );
}

export default App;
