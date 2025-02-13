import {
  Box,
  Flex,
  Link,
  Button,
  Spacer,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

function Navbar() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box bg="blue.500" px={4} py={3} color="white">
      <Flex align="center">
        {/* Logo */}
        <Box fontSize="xl" fontWeight="bold">
          MyLogo
        </Box>

        <Spacer />

        {/* Desktop Menu */}
        <Flex display={{ base: "none", md: "flex" }} gap={6}>
          <Link href="#" _hover={{ textDecoration: "none", color: "gray.200" }}>
            Home
          </Link>
          <Link href="#" _hover={{ textDecoration: "none", color: "gray.200" }}>
            About
          </Link>
          <Link href="#" _hover={{ textDecoration: "none", color: "gray.200" }}>
            Services
          </Link>
          <Link href="#" _hover={{ textDecoration: "none", color: "gray.200" }}>
            Contact
          </Link>
          <Button colorScheme="whiteAlpha" variant="outline">
            Login
          </Button>
        </Flex>

        {/* Mobile Menu Button */}
        <IconButton
          aria-label="Open Menu"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ base: "flex", md: "none" }}
          onClick={onToggle}
          variant="ghost"
          color="white"
        />
      </Flex>

      {/* Mobile Menu */}
      {isOpen && (
        <Box display={{ base: "block", md: "none" }} mt={3}>
          <Flex direction="column" gap={3}>
            <Link
              href="#"
              _hover={{ textDecoration: "none", color: "gray.200" }}
            >
              Home
            </Link>
            <Link
              href="#"
              _hover={{ textDecoration: "none", color: "gray.200" }}
            >
              About
            </Link>
            <Link
              href="#"
              _hover={{ textDecoration: "none", color: "gray.200" }}
            >
              Services
            </Link>
            <Link
              href="#"
              _hover={{ textDecoration: "none", color: "gray.200" }}
            >
              Contact
            </Link>
            <Button colorScheme="whiteAlpha" variant="outline">
              Login
            </Button>
          </Flex>
        </Box>
      )}
    </Box>
  );
}

export default Navbar;
