import React from 'react';
import { Input, Button, HStack } from '@chakra-ui/react';

function TodoInput({ addTodo, newTodo, setNewTodo }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack>
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Neues ToDo"
        />
        <Button type="submit" colorScheme="blue">Hinzufügen</Button>
      </HStack>
    </form>
  );
}

export default TodoInput;
