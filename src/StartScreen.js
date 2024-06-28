// src/StartScreen.js
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

const StartScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [passcode, setPasscode] = useState('');

  const handleLogin = () => {
    if (username && passcode) {
      onLogin(username, passcode);
    } else {
      alert('Please enter both username and passcode.');
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
