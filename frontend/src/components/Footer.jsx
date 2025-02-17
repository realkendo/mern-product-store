import { Box, Flex, IconButton, Link } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <Box bg="purple.600" color="white" py={6} mt={10} textAlign="center">
      <Flex justify="center" gap={4}>
        <SocialIcon href="https://facebook.com" icon={<FaFacebook />} />
        <SocialIcon href="https://twitter.com" icon={<FaTwitter />} />
        <SocialIcon href="https://instagram.com" icon={<FaInstagram />} />
        <SocialIcon href="https://github.com" icon={<FaGithub />} />
      </Flex>
      <Box mt={4} fontSize="sm">
        &copy; {new Date().getFullYear()} dbCapital. All rights reserved.
      </Box>
    </Box>
  );
}

// Social Media Icon Component
const SocialIcon = ({ href, icon }) => (
  <Link href={href} isExternal>
    <IconButton
      aria-label="Social Icon"
      icon={icon}
      variant="ghost"
      color="white"
      size="lg"
      _hover={{ color: "red.300", transform: "scale(1.2)" }}
      transition="0.3s"
    />
  </Link>
);

export default Footer;
