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
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

function Navbar() {
  const { isOpen, onToggle } = useDisclosure(); // Mobile menu state

  return (
    <Box
      bgGradient="linear(to-r, blue.600, purple.800)"
      color="white"
      px={6}
      py={4}
      boxShadow="lg"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex align="center">
        {/* Logo */}
        <Box fontSize="2xl" fontWeight="bold" letterSpacing="wide">
          🏦dbCapital
        </Box>

        <Spacer />

        {/* Desktop Links */}
        <HStack spacing={8} display={{ base: "none", md: "flex" }}>
          <NavItem href="#">Home</NavItem>
          <NavItem href="#">Services</NavItem>
          <NavItem href="#">About</NavItem>
          <NavItem href="#">Contact</NavItem>
          <Button colorScheme="pink" variant="solid" borderRadius="full">
            Sign Up
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
          _hover={{ bg: "whiteAlpha.300" }}
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
            <NavItem href="#">Home</NavItem>
            <NavItem href="#">Services</NavItem>
            <NavItem href="#">About</NavItem>
            <NavItem href="#">Contact</NavItem>
            <Button colorScheme="red" variant="solid" borderRadius="full">
              Sign Up
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
    _hover={{ color: "red.300" }}
  >
    {children}
  </Link>
);

export default Navbar;
