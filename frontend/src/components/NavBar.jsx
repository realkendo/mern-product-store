import {
  Box,
  Flex,
  Link,
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

function Navbar() {
  const { isOpen, onToggle } = useDisclosure(); // Mobile menu state

  // Toggle light/dark mode
  const { colorMode, toggleColorMode } = useColorMode();

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
        <Link
          href="/"
          _hover={{ textDecoration: "underline", color: "red.400" }}
        >
          <Box fontSize="2xl" fontWeight="bold" letterSpacing="wide">
            jB$tores 🛒
          </Box>
        </Link>

        <Spacer />

        {/* Desktop Links */}
        <HStack spacing={8} display={{ base: "none", md: "flex" }}>
          <NavItem href="#">Chat</NavItem>
          <NavItem href="#">Services</NavItem>
          <NavItem href="#">About</NavItem>
          <NavItem href="#">Contact</NavItem>
          <Link to={"/signin"} color="white">
            <Button colorScheme="red" variant="solid">
              Sign In
            </Button>
          </Link>
        </HStack>

        {/* Toggle modes */}
        <HStack spacing={2} alignItems={"center"} margin={4}>
          <Link to={"/create"} color="white">
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
            <NavItem href="/">Chat</NavItem>
            <NavItem href="/services">Services</NavItem>
            <NavItem href="/about">About</NavItem>
            <NavItem href="/contact">Contact</NavItem>
            <Button colorScheme="red" variant="solid" borderRadius="full">
              Sign In
            </Button>
          </Flex>
        </Box>
      </Collapse>
    </Box>
  );
}

// Reusable Nav Item
const NavItem = ({ href, children }) => (
  <Link
    href={href}
    fontSize="lg"
    fontWeight="medium"
    _hover={{ color: "red.500" }}
  >
    {children}
  </Link>
);

export default Navbar;
