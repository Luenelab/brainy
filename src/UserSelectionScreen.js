import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  List,
  ListItem,
  HStack,
} from '@chakra-ui/react';

const token = process.env.REACT_APP_GITHUB_TOKEN;

const UserSelectionScreen = ({ onSelectUser, onCreateNewUser }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const passcodeInputs = useRef([]);
  const [passcode, setPasscode] = useState(['', '', '', '']);

  useEffect(() => {
    // Fetch the list of users from the backend or a static file
    fetch('/path/to/userlist.json') // Replace with actual path or API endpoint
      .then(response => response.json())
      .then(data => setUsers(data.users))
      .catch(error => console.error('Error fetching user list:', error));
  }, []);

  const filteredUsers = users.filter(user =>
    user.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleUserSelect = async (user) => {
    setSelectedUser(user);
    passcodeInputs.current[0].focus(); // Focus the first passcode input field after selecting user
  };

  const handleContinue = async () => {
    const passcodeString = passcode.join('');
    if (selectedUser && passcodeString.length === 4) {
      // Perform GitHub API call to authenticate user and proceed
      const authenticated = await authenticateUser(selectedUser, passcodeString);
      if (authenticated) {
        onSelectUser(selectedUser, passcodeString);
      } else {
        alert('Invalid passcode. Please try again.');
      }
    }
  };

  const authenticateUser = async (username, passcode) => {
    const user = 'luenelab';
    const repo = 'brainy_data';
    const filePath = `brain_sourcefiles/${username}.md`;
    const endpoint = `https://api.github.com/repos/${user}/${repo}/contents/${filePath}`;

    try {
      // Fetch user file to check passcode validity
      const fileResponse = await fetch(endpoint, {
        headers: {
          Authorization: `token ${token}`,
        },
      });

      if (fileResponse.ok) {
        const fileData = await fileResponse.json();
        // Decode content from base64 and parse JSON
        const decodedContent = atob(fileData.content);
        const { passcode: storedPasscode } = JSON.parse(decodedContent);
        
        // Check if stored passcode matches input
        return passcode === storedPasscode;
      } else {
        console.error('Failed to fetch user file:', fileResponse.status, fileResponse.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error authenticating user:', error);
      return false;
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
        <Heading as="h1" size="2xl" textAlign="center" mb={6}>
          Welcome to #brain
        </Heading>
        <Button colorScheme="brand" onClick={onCreateNewUser} variant="solid">
          Make New Brain
        </Button>
        <FormControl>
          <FormLabel htmlFor="user-search">Continue Braining</FormLabel>
          <Input
            id="user-search"
            placeholder="Search for your username"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="filled"
          />
          {filteredUsers.length > 0 && (
            <List mt={2} spacing={2} maxH="200px" overflowY="auto">
              {filteredUsers.map(user => (
                <ListItem
                  key={user}
                  bg="brand.700"
                  p={2}
                  borderRadius="md"
                  _hover={{ bg: 'brand.600', cursor: 'pointer' }}
                  onClick={() => handleUserSelect(user)}
                >
                  {user}
                </ListItem>
              ))}
            </List>
          )}
        </FormControl>
        {selectedUser && (
          <FormControl>
            <FormLabel htmlFor="passcode">Enter Passcode</FormLabel>
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
        )}
        {selectedUser && (
          <Button onClick={handleContinue} variant="solid">
            Continue
          </Button>
        )}
      </VStack>
    </Box>
  );
};

export default UserSelectionScreen;
