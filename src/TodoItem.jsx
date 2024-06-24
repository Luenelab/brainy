import React from 'react';
import { Button, Box, Text } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

function TodoItem({ todo, onCheck }) {
  const handleCheck = () => {
    onCheck(todo.id);
  };

 
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Text flex="1">{todo.text}</Text>
      <Button onClick={handleCheck} colorScheme="green" size="sm">
        <DeleteIcon/>
      </Button>
     
    </Box>
  );
}

export default TodoItem;
