import React from 'react';
import { Input, Button, VStack } from '@chakra-ui/react';

function TodoInput({ addTodo, newTodo, setNewTodo }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo);
      setNewTodo(''); // Clear input after adding todo
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission on Enter press
      handleSubmit(e); // Call handleSubmit to add todo
    }
  };

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo);
      setNewTodo(''); // Clear input after adding todo
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4} width="100%" align="stretch" mb={8}>
        <Input
          placeholder="Enter thought"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={handleKeyDown} // Handle Enter key press
          variant="filled"
          size="lg"
        />
        <Button onClick={handleAddTodo} colorScheme="brand" size="lg">
          🧠 → 📱
        </Button>
      </VStack>
    </form>
  );
}

export default TodoInput;
