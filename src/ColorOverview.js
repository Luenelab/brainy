import React from 'react';
import { Box, Text, Button, VStack, Heading } from '@chakra-ui/react';

const ColorOverview = ({ themeColors }) => {
  const colorEntries = Object.entries(themeColors);

  return (
    <Box maxW="600px" mx="auto" mt={8} p={4}>
      <Box bg="brand.800" color="brand.50" borderRadius="md" p={4} boxShadow="md" mb={6}>
        <Heading as="h2" size="md" mb={4}>Theme Colors</Heading>
        <VStack align="stretch">
          {colorEntries.map(([colorName, colorValue]) => (
            <Box key={colorName} p={2} bg={colorValue} color={getTextColor(colorValue)} borderRadius="md" mb={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box flex="1">
                  <Text fontSize="md" fontWeight="bold" color={getContrastColor(colorValue)}>{colorName}</Text>
                  <Text fontSize="sm" color="gray.200">{colorValue}</Text>
                </Box>
                <Button size="sm" onClick={() => copyToClipboard(colorValue)}>Copy</Button>
              </Box>
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

// Function to determine text color based on background color brightness
const getTextColor = (bgColor) => {
  const rgb = hexToRgb(bgColor);
  if (!rgb) return 'black'; // Default to black if unable to determine brightness
  const brightness = rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114;
  return brightness < 128 ? 'white' : 'black'; // Use white text for dark backgrounds, black for light backgrounds
};

// Function to determine contrast color for title and hex code text
const getContrastColor = (bgColor) => {
  const rgb = hexToRgb(bgColor);
  if (!rgb) return 'black'; // Default to black if unable to determine brightness
  const brightness = rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114;
  return brightness < 128 ? 'white' : 'gray.800'; // Use white text for dark backgrounds, darker gray for light backgrounds
};

// Function to convert hex color to RGB array
const hexToRgb = (hex) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
};

// Function to copy color code to clipboard
const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
};

export default ColorOverview;
