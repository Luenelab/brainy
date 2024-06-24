// src/App.js
import React from 'react';
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
  useColorMode,
} from '@chakra-ui/react';
import { FiMoreVertical } from 'react-icons/fi';
import theme from './theme'; // Import custom Chakra UI theme
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import ColorOverview from './ColorOverview'; // Import ColorOverview component
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

function App() {
  const [todos, setTodos] = React.useState([]);
  const [completedTodos, setCompletedTodos] = React.useState([]);
  const [newTodo, setNewTodo] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const [todoToDelete, setTodoToDelete] = React.useState(null);

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text };
    setTodos([...todos, newTodo]);
    setNewTodo('');
  };

  const completeTodo = (id) => {
    const completedTodo = todos.find(todo => todo.id === id);
    setTodos(todos.filter(todo => todo.id !== id));
    setCompletedTodos([...completedTodos, completedTodo]);
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

  const CompletedTodos = ({ completedTodos, onDeleteCompleted }) => {
    return (
      <Box mt={8}>
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
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Box p={10} maxW="md" mx="auto" mt={8} bg="brand.800" color="brand.50">
        <Heading mb={16} as="h1" size="2xl" textAlign="left" className="bigmarker-cg-keynote-title">
          <span style={{ textDecoration: 'underline solid rgba(255, 245, 218, 1)', textDecorationThickness: '2px', textUnderlineOffset: '2px', transition: 'background-size 400ms cubic-bezier(0.8, 0, 0.2, 1), text-decoration-color 400ms cubic-bezier(0.8, 0, 0.2, 1)' }}>
            Todapp App
          </span>
         
        </Heading>

        <TodoInput addTodo={addTodo} newTodo={newTodo} setNewTodo={setNewTodo} />

        <VStack spacing={4} width="100%" align="stretch">
          {todos.map((todo) => (
            <Box key={todo.id} p={2} bg="brand.700" color="brand.50" borderColor="brand.500" borderRadius="md">
              <TodoItem todo={todo} onCheck={completeTodo} onDelete={deleteTodo} />
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
