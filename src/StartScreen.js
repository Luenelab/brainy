import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { useAuth } from './AuthContext';

const token = process.env.REACT_APP_GITHUB_TOKEN;

const StartScreen = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [passcode, setPasscode] = useState('');

  const handleLogin = () => {
    // Perform GitHub API call to fetch user file and validate credentials
    fetchUserFile(username, passcode);
  };

  const fetchUserFile = async (username, passcode) => {
    const user = 'luenelab';
    const repo = 'brainy';
    const filePath = `brain_sourcefiles/${username}.md`;
    const endpoint = `https://api.github.com/repos/${user}/${repo}/contents/${filePath}`;

    try {
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `token ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user file from GitHub');
      }

      const data = await response.json();
      const content = atob(data.content); // Decode base64 content

      // Process fetched content (e.g., validate passcode)
      console.log('Fetched file content:', content);

      // Validate passcode and proceed if correct
      if (passcode === '1234') { // Replace with actual passcode validation
        login(username, passcode);
      } else {
        alert('Invalid passcode');
      }
    } catch (error) {
      console.error('Error fetching user file:', error);
      // Handle error (e.g., display error message to user)
    }
  };

  return (
    <Box
      p={4}
      maxW={{ base: '100%', md: 'md' }}
      mx="auto"
      mt={8}
      color="brand.50"
      borderRadius="md"
      boxShadow="lg"
    >
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="2xl" textAlign="center" mb={6}>
          Brainy
        </Heading>
        <FormControl>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="filled"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="passcode">Passcode</FormLabel>
          <Input
            id="passcode"
            type="password"
            placeholder="Enter your passcode"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            variant="filled"
          />
        </FormControl>
        <Button
          colorScheme="brand"
          onClick={handleLogin}
          variant="solid"
        >
          Continue
        </Button>
      </VStack>
    </Box>
  );
};

export default StartScreen;
