import React from 'react';
import { Input, Button, VStack } from '@chakra-ui/react';

function TodoInput({ addTodo, newTodo, setNewTodo }) {
  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      addTodo(newTodo);
      setNewTodo('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <VStack spacing={4} width="100%" align="stretch" mb={8}>
      <Input
        placeholder="Enter a new todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={handleKeyDown}
        variant="filled"
        size="lg"
      />
      <Button onClick={handleAddTodo} colorScheme="brand" size="lg">
        Add Todo
      </Button>
    </VStack>
  );
}

export default TodoInput;
