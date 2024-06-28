import React from 'react';
import { Box, Button, Input, Text, VStack } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

function StartScreen({ brainName, setBrainName, onSave }) {
  const history = useHistory();

  return (
    <Box p={4} maxW="md" mx="auto" mt={8} bg="brand.800" color="brand.50">
      <VStack spacing={4}>
        <Text fontSize="2xl" color="brand.50">Dein Brain Name</Text>
        <Input
          placeholder="Brain Name"
          value={brainName}
          onChange={(e) => setBrainName(e.target.value)}
        />
        <Button colorScheme="blue" onClick={() => {
          onSave();
          history.push('/todos');
        }}>
          Speichern
        </Button>
      </VStack>
    </Box>
  );
}

export default StartScreen;
