// src/App.js

import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Heading,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { FiMoreVertical } from 'react-icons/fi';
import customTheme from './theme';
import {
  fetchTodosFromGitHub,
  parseTodosData,
  createRaphaelFile,
  generateTodosContent,
} from './utils/todoUtils';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchTodosFromGitHub();
        console.log(response);  // Ensure data is fetched correctly
        const todosData = parseTodosData(response);
        setTodos(todosData.todos);
        setCompletedTodos(todosData.completedTodos);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          await createRaphaelFile();
        } else {
          setError(error);
        }
      }
    };

    loadData();
  }, []);

  const deleteCompletedTodos = async () => {
    setCompletedTodos([]);
    await saveTodosToGitHub(todos, []);
  };

  const saveTodosToGitHub = async (todos, completedTodos) => {
    const todosContent = generateTodosContent(todos, completedTodos);
    try {
      await axios.put(
        'https://api.github.com/repos/Luenelab/brainy_data/contents/brain_sourcefiles/raphael.md',
        {
          message: 'Update todos via app',
          content: btoa(todosContent),
        },
        {
          headers: {
            Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
          },
        }
      );
      alert('Todos saved successfully!');
    } catch (error) {
      console.error('Error saving todos:', error);
      alert('Failed to save todos. Please try again later.');
    }
  };

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <ChakraProvider theme={customTheme}>
      <Box p={4} maxW="md" mx="auto" mt={8} color="brand.50">
        <Heading mb={8} as="h1" size="2xl" textAlign="left" className="bigmarker-cg-keynote-title">
          #brain
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FiMoreVertical />}
              variant="outline"
              aria-label="Options"
              color="brand.50"
              position="absolute"
              top="4"
              right="4"
            />
            <MenuList>
              <MenuItem onClick={deleteCompletedTodos}>Delete Completed Todos</MenuItem>
            </MenuList>
          </Menu>
        </Heading>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Todo List
          </Heading>
          <Box p={4} borderRadius="md" mb={4}>
            {todos.length > 0 ? (
              <ul>
                {todos.map((todo) => (
                  <li key={todo.id}>{todo.text}</li>
                ))}
              </ul>
            ) : (
              <p>No todos found.</p>
            )}
          </Box>

          <Heading as="h2" size="lg" mb={4}>
            Completed Todos
          </Heading>
          <Box p={4} borderRadius="md" mb={4}>
            {completedTodos.length > 0 ? (
              <ul>
                {completedTodos.map((todo) => (
                  <li key={todo.id}>{todo.text}</li>
                ))}
              </ul>
            ) : (
              <p>No completed todos found.</p>
            )}
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
