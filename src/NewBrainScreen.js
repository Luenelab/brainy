import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  HStack,
} from '@chakra-ui/react';

const token = process.env.REACT_APP_GITHUB_TOKEN;

const NewBrainScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const passcodeInputs = useRef([]);
  const [passcode, setPasscode] = useState(['', '', '', '']);

  const handlePasscodeChange = (value, index) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newPasscode = [...passcode];
      newPasscode[index] = value;
      setPasscode(newPasscode);

      // Automatically focus the next input field if available
      if (index < passcodeInputs.current.length - 1 && value !== '') {
        passcodeInputs.current[index + 1].focus();
      }
    }
  };

  const handleCreateUser = async () => {
    const passcodeString = passcode.join('');
    if (username && passcodeString.length === 4) {
      // Perform GitHub API call to create a new user file
      await createOrUpdateUserFile(username, passcodeString);
    }
  };

  const createOrUpdateUserFile = async (username, passcode) => {
    const user = 'luenelab';
    const repo = 'brainy_data';
    const filePath = `brain_sourcefiles/${username}.md`;
    const endpoint = `https://api.github.com/repos/${user}/${repo}/contents/${filePath}`;

    try {
      // Fetch existing file to get its SHA if it exists
      const existingFileResponse = await fetch(endpoint, {
        headers: {
          Authorization: `token ${token}`,
        },
      });

      let existingFileData = null;
      if (existingFileResponse.ok) {
        existingFileData = await existingFileResponse.json();
      }

      // Prepare content for the file (e.g., JSON format for todos)
      const fileContent = JSON.stringify({ todos: [] }); // Example structure

      const requestOptions = {
        method: existingFileData ? 'PUT' : 'POST',
        headers: {
          Authorization: `token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: existingFileData ? 'Update file' : 'Create new file',
          content: btoa(fileContent), // Encode content to base64
          sha: existingFileData ? existingFileData.sha : null, // SHA required for updates
        }),
      };

      // Send request to GitHub API
      const response = await fetch(endpoint, requestOptions);
      if (!response.ok) {
        throw new Error('Failed to create/update user file on GitHub');
      }

      const data = await response.json();
      console.log('File created/updated successfully:', data);

      // Optionally handle success (e.g., navigate to main app screen)
      onLogin(username, passcode);
    } catch (error) {
      console.error('Error creating/updating user file:', error);
      // Handle error (e.g., display error message to user)
    }
  };

  return (
    <Box
      p={4}
      maxW={{ base: '100%', md: 'md' }}
      mx="auto"
      mt={8}
      bg="brand.800"
      color="brand.50"
      borderRadius="md"
      boxShadow="lg"
    >
      <VStack spacing={4} align="stretch">
        <Heading as="h2" size="lg" textAlign="center">
          Create a New Brain
        </Heading>
        <FormControl>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            id="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="passcode">Passcode</FormLabel>
          <HStack spacing={2} justifyContent="center">
            {Array.from({ length: 4 }, (_, index) => (
              <Input
                key={index}
                id={`passcode-${index}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                ref={(el) => (passcodeInputs.current[index] = el)}
                value={passcode[index]}
                onChange={(e) => handlePasscodeChange(e.target.value, index)}
                textAlign="center"
                borderRadius="md"
                bg="brand.700"
                color="brand.50"
                focusBorderColor="brand.50"
                _hover={{ bg: 'brand.900' }}
                _focus={{ bg: 'brand.800' }}
                fontSize="2xl"
                w="12"
              />
            ))}
          </HStack>
        </FormControl>
        <Button onClick={handleCreateUser} variant="solid">
          Create Brain
        </Button>
      </VStack>
    </Box>
  );
};

export default NewBrainScreen;
