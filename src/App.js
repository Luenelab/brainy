import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ChakraProvider,
  Box,
  Heading,
  VStack,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Input,
} from '@chakra-ui/react';
import { FiMoreVertical } from 'react-icons/fi';
import theme from './theme'; // Import custom Chakra UI theme
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';


const GITHUB_API_URL = 'https://api.github.com';
const REPO_OWNER = 'Luenelab';
const REPO_NAME = 'brainy_data';
const FILE_PATH = 'brain_sourcefiles';
const BRAIN_FILE = 'brain_raphael';
const AUTH_PASSCODE = '1234'; // Hardcoded authentication passcode

function App() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [passcode, setPasscode] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [modalError, setModalError] = useState('');
  const [syncMessage, setSyncMessage] = useState('');

  // Function to handle change in passcode input
  const handleChangePasscode = (event) => {
    setPasscode(event.target.value);
  };

  // Function to handle login button click or Enter key press
  const handleLogin = () => {
    if (passcode === AUTH_PASSCODE) {
      setAuthenticated(true);
      setSyncMessage('Authenticated successfully. Loading data...');
    } else {
      setModalError('Incorrect passcode. Please try again.');
    }
  };

  // Function to fetch todos from GitHub
  const fetchTodosFromGitHub = async () => {
    try {
      const url = `https://api.github.com/repos/Luenelab/brainy_data/contents/brain_sourcefiles/brain_raphael.json`;
      const headers = {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      };

      const response = await axios.get(url, { headers });
      const content = response.data.content;
      const decodedContent = JSON.parse(atob(content));

      const incompleteTodos = decodedContent.filter(todo => !todo.completed);
      const completedTodos = decodedContent.filter(todo => todo.completed);

      setTodos(incompleteTodos);
      setCompletedTodos(completedTodos);
      setSyncMessage('Todos loaded successfully.');
    } catch (error) {
      console.error('Error fetching todos:', error);
      setSyncMessage('Failed to fetch todos from GitHub.');
    }
  };

  // useEffect hook to fetch todos on component mount
  useEffect(() => {
    if (authenticated) {
      fetchTodosFromGitHub();
    }
  }, [authenticated]);

  // Function to add a new todo item
  const addTodo = (text) => {
    const newTodoItem = { id: Date.now(), text, completed: false };
    const updatedTodos = [...todos, newTodoItem];
    setTodos(updatedTodos);
    syncToGitHub(updatedTodos);
    setNewTodo('');
    console.log('Todo added:', newTodoItem);
  };

  // Function to mark a todo item as completed
  const completeTodo = (id) => {
    const todoToComplete = todos.find((todo) => todo.id === id);
    todoToComplete.completed = true;
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    setCompletedTodos([...completedTodos, todoToComplete]);
    syncToGitHub([...updatedTodos, todoToComplete]);
    console.log('Todo completed:', todoToComplete);
  };

  // Function to delete a todo item
  const deleteTodo = (id) => {
    setIsOpen(true);
    setTodoToDelete(id);
  };

  // Function to confirm deletion of a todo item
  const confirmDelete = () => {
    const todoToDeleteObj = todos.find((todo) => todo.id === todoToDelete);
    setIsOpen(false);
    if (todoToDeleteObj) {
      const updatedTodos = todos.filter((todo) => todo.id !== todoToDelete);
      setTodos(updatedTodos);
      syncToGitHub(updatedTodos);
      console.log('Todo deleted:', todoToDeleteObj);
    } else {
      const completedTodoToDeleteObj = completedTodos.find((todo) => todo.id === todoToDelete);
      const updatedCompletedTodos = completedTodos.filter((todo) => todo.id !== todoToDelete);
      setCompletedTodos(updatedCompletedTodos);
      syncToGitHub(todos); // Sync todos after deletion
      console.log('Completed todo deleted:', completedTodoToDeleteObj);
    }
  };

  // Function to delete all completed todos
  const deleteCompletedTodos = () => {
    setCompletedTodos([]);
    syncToGitHub(todos); // Sync todos after deletion
    console.log('All completed todos deleted.');
  };

  // Function to sync todo data with GitHub repository
  const syncToGitHub = async (items) => {
    
    try {
      const content = JSON.stringify(items, null, 2);
      const url = `https://api.github.com/repos/Luenelab/brainy_data/contents/brain_sourcefiles/brain_raphael.json`;
      const headers = {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      };

      // Fetch current file details
      const { data: { sha } } = await axios.get(url, { headers });

      // Update file content
      await axios.put(url, {
        message: 'Update from Brainy app',
        content: btoa(content), // Using btoa() to encode content to base64
        sha,
      }, { headers });

      setSyncMessage('Sync successful.');
      console.log('File updated successfully.');
    } catch (error) {
      console.error('Error updating file:', error);
      setSyncMessage('Failed to sync with GitHub.');
    }
  };

  // Component to display completed todos
  const CompletedTodos = ({ completedTodos }) => {
    return (
      <Box mt={8}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Heading as="h2" size="lg" color="brand.50">
            Completed Todos
          </Heading>
          <Menu>
            <MenuButton as={IconButton} icon={<FiMoreVertical />} variant="outline" aria-label="Options" color="brand.50" />
            <MenuList>
              <MenuItem onClick={deleteCompletedTodos}>Delete All Completed Todos</MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Box>
          {completedTodos.map((todo) => (
            <Box key={todo.id} p={4} bg="brand.700" borderRadius="md" mb={2}>
              <Text color="brand.50" textDecoration="line-through">{todo.text}</Text>
            </Box>
          ))}
        </Box>
      </Box>
    );
  };

  // Render UI components based on authentication status
  return (
    <ChakraProvider theme={theme}>
      <Box p={10} maxW="md" mx="auto" mt={8} bg="brand.800" color="brand.50">
        <Heading mb={4} as="h1" size="2xl" textAlign="left">
          #brain
        </Heading>
        {syncMessage && <Text mt={2} color="gray.400" fontSize="sm">{syncMessage}</Text>}
        {!authenticated && (
          <VStack spacing={4} width="100%" align="stretch" mb={8}>
            <Input
              type="password"
              placeholder="Enter passcode"
              value={passcode}
              onChange={handleChangePasscode}
              variant="filled"
              size="lg"
            />
            <Button onClick={handleLogin} colorScheme="teal" size="lg">
              Login
            </Button>
            {modalError && (
              <Text mt={2} color="red.500">
                {modalError}
              </Text>
            )}
          </VStack>
        )}
        {authenticated && (
          <>
            <TodoInput addTodo={addTodo} newTodo={newTodo} setNewTodo={setNewTodo} />

            <VStack spacing={4} width="100%" align="stretch">
              {todos.map((todo) => (
                <Box key={todo.id} p={2} bg="brand.700" color="brand.50" borderColor="brand.500" borderRadius="md">
                  <TodoItem todo={todo} onCheck={completeTodo} onDelete={deleteTodo} />
                </Box>
              ))}
            </VStack>

            {completedTodos.length > 0 && (
              <CompletedTodos completedTodos={completedTodos} />
            )}

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
              <ModalOverlay />
              <ModalContent bg="brand.800" color="brand.50">
                <ModalHeader>Confirm Delete</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  Are you sure you want to delete this todo?
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="red" mr={3} onClick={confirmDelete}>
                    Delete
                  </Button>
                  <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        )}
      </Box>
    </ChakraProvider>
  );
}

export default App;
