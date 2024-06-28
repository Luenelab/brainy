// src/App.js
import React, { useState } from 'react';
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
  ColorModeScript,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import { FiMoreVertical } from 'react-icons/fi';
import customTheme from './theme';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import StartScreen from './StartScreen';

function App() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [user, setUser] = useState(null);

  const addTodo = (text) => {
    const newTodoItem = { id: Date.now(), text };
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };

  const completeTodo = (id) => {
    const completedTodo = todos.find(todo => todo.id === id);
    setTodos(todos.filter(todo => todo.id !== id));
    setCompletedTodos([...completedTodos, completedTodo]);
  };

  const updateTodo = (id, newText) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, text: newText } : todo)));
  };

  const deleteTodo = (id) => {
    setIsOpen(true);
    setTodoToDelete(id);
  };

  const confirmDelete = () => {
    const todoToDeleteObj = todos.find(todo => todo.id === todoToDelete);
    setIsOpen(false);
    if (todoToDeleteObj) {
      setTodos(todos.filter(todo => todo.id !== todoToDelete));
    } else {
      const completedTodoToDeleteObj = completedTodos.find(todo => todo.id === todoToDelete);
      setCompletedTodos(completedTodos.filter(todo => todo.id !== todoToDelete));
    }
  };

  const deleteCompletedTodos = () => {
    setCompletedTodos([]);
  };

  const handleLogin = (username, passcode) => {
    setUser({ username, passcode });
  };

  const handleLogout = () => {
    setUser(null);
    setTodos([]);
    setCompletedTodos([]);
  };

  if (!user) {
    return <StartScreen onLogin={handleLogin} />;
  }

  const CompletedTodos = ({ completedTodos, onDeleteCompleted }) => {
    return (
      <Box mt={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Heading as="h2" size="lg" color="brand.50">
            Completed Todos
          </Heading>
          <Menu>
            <MenuButton as={IconButton} icon={<FiMoreVertical />} variant="outline" aria-label="Options" color="brand.50" />
            <MenuList>
              <MenuItem onClick={onDeleteCompleted}>Delete All Completed Todos</MenuItem>
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

  return (
    <ChakraProvider theme={customTheme}>
      <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
      <Box p={4} maxW={{ base: '100%', md: 'md' }} mx="auto" mt={8} color="brand.50">
        <Heading mb={8} as="h1" size="2xl" textAlign="left" className="bigmarker-cg-keynote-title">
          <span style={{ textDecoration: 'underline solid rgba(255, 245, 218, 1)', textDecorationThickness: '2px', textUnderlineOffset: '2px', transition: 'background-size 400ms cubic-bezier(0.8, 0, 0.2, 1), text-decoration-color 400ms cubic-bezier(0.8, 0, 0.2, 1)' }}>
            Brainy
          </span>
          <Menu>
            <MenuButton as={IconButton} icon={<FiMoreVertical />} variant="outline" aria-label="Options" color="brand.50" position="absolute" top="4" right="4" />
            <MenuList>
              <MenuItem onClick={handleLogout}>Change User</MenuItem>
              <MenuItem>See Source</MenuItem>
            </MenuList>
          </Menu>
        </Heading>

        <TodoInput addTodo={addTodo} newTodo={newTodo} setNewTodo={setNewTodo} />

        <VStack spacing={4} width="100%" align="stretch">
          {todos.map((todo) => (
            <Box key={todo.id} p={2} bg="brand.700" color="brand.50" borderColor="brand.500" borderRadius="md">
              <TodoItem todo={todo} onCheck={completeTodo} onUpdate={updateTodo} onDelete={deleteTodo} />
            </Box>
          ))}
        </VStack>

        {completedTodos.length > 0 && (
          <CompletedTodos completedTodos={completedTodos} onDeleteCompleted={deleteCompletedTodos} />
        )}
      </Box>

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

    </ChakraProvider>
  );
}

export default App;
