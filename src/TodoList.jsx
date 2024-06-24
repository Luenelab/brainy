// TodoItem.jsx
import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { CheckIcon, DeleteIcon } from '@chakra-ui/icons';

function TodoItem({ todo, onDelete, onCheck }) {
  const handleCheck = () => {
    onCheck(todo.id);
  };

  
}

export default TodoItem;
