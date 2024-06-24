import React from 'react';
import { Button, Box, Text } from '@chakra-ui/react';
import { CheckIcon, DeleteIcon } from '@chakra-ui/icons';

function TodoItem({ todo, onDelete, onCheck }) {
  const handleCheck = () => {
    onCheck(todo.id);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Text flex="1">{todo.text}</Text>
      <Button onClick={handleCheck} colorScheme="green" size="sm">
        <CheckIcon />
      </Button>
      <Button onClick={handleDelete} colorScheme="red" size="sm" ml={2}>
        <DeleteIcon />
      </Button>
    </Box>
  );
}

export default TodoItem;
