import React, { useState } from 'react';
import { Button, Box, Text, Input } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

function TodoItem({ todo, onCheck, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleCheck = () => {
    onCheck(todo.id);
  };

  const handleUpdate = () => {
    onUpdate(todo.id, editedText);
    setIsEditing(false);
  };

  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleInputBlur = () => {
    handleUpdate();
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleUpdate();
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      {isEditing ? (
        <Input
          value={editedText}
          onChange={handleTextChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          autoFocus
        />
      ) : (
        <Text flex="1" onClick={handleTextClick}>
          {todo.text}
        </Text>
      )}
      <Button onClick={handleCheck} colorScheme="green" size="sm">
        <DeleteIcon />
      </Button>
    </Box>
  );
}

export default TodoItem;
