import {
  Box,
  Flex,
  Button,
  IconButton,
  Collapse,
  useDisclosure,
  Spacer,
  HStack,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { HamburgerIcon, CloseIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Navbar() {
  const { isOpen, onToggle } = useDisclosure(); // Mobile menu state
  const { colorMode, toggleColorMode } = useColorMode(); // Toggle light/dark mode

  return (
    <Box
      bgGradient="linear(to-r, purple.900, blue.900, purple.900)"
      color="white"
      px={6}
      py={4}
      boxShadow="lg"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex align="center">
        <Link to="/">
          <Box fontSize="2xl" fontWeight="bold" letterSpacing="wide">
            jB$tores 🛒
          </Box>
        </Link>

        <Spacer />

        {/* Desktop Links */}
        <HStack spacing={8} display={{ base: "none", md: "flex" }}>
          <NavItem to="/chat">Chat</NavItem>
          <NavItem to="/services">Services</NavItem>
          <NavItem to="/about">About</NavItem>
          <NavItem to="/contact">Contact</NavItem>

          {/* Fixed Sign In Button */}
          <Link to="/signin">
            <Button colorScheme="red" variant="solid">
              login
            </Button>
          </Link>
        </HStack>

        {/* Toggle Modes */}
        <HStack spacing={2} alignItems="center" margin={4}>
          {/* Fixed Create Button */}
          <Link to="/create">
            <Button colorScheme="green" variant="solid">
              <PlusSquareIcon />
            </Button>
          </Link>

          <Button onClick={toggleColorMode} variant="outline">
            {colorMode === "light" ? <FaMoon /> : <FaSun />}
          </Button>
        </HStack>

        {/* Mobile Menu Button */}
        <IconButton
          aria-label="Toggle Menu"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ base: "flex", md: "none" }}
          onClick={onToggle}
          variant="outline"
          color="white"
          borderColor="white"
          _hover={{ bg: "red.500" }}
        />
      </Flex>

      {/* Mobile Menu */}
      <Collapse in={isOpen} animateOpacity>
        <Box
          display={{ base: "block", md: "none" }}
          mt={4}
          bg="blue.700"
          p={4}
          borderRadius="md"
        >
          <Flex direction="column" gap={3} align="center">
            <NavItem to="/chat">Chat</NavItem>
            <NavItem to="/services">Services</NavItem>
            <NavItem to="/about">About</NavItem>
            <NavItem to="/contact">Contact</NavItem>

            {/* Fixed Sign In Button */}
            <Link to="/signin">
              <Button colorScheme="red" variant="solid" borderRadius="full">
                Sign In
              </Button>
            </Link>
          </Flex>
        </Box>
      </Collapse>
    </Box>
  );
}

// Reusable Nav Item
const NavItem = ({ to, children }) => (
  <Link to={to}>
    <Box fontSize="lg" fontWeight="medium" _hover={{ color: "red.500" }}>
      {children}
    </Box>
  </Link>
);

export default Navbar;
