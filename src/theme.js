// src/theme.js
import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  colors: {
    brand: {
      25: '#FFFBF0', // new lightest color
      50: '#fff5da', // lightest color
      100: '#e1dac3',
      200: '#c7c1ad',
      300: '#ada897',
      400: '#938f81',
      500: '#79766b',
      600: '#5f5d55',
      700: '#45443f',
      800: '#2b2b29',
      900: '#111213', // darkest color
    },
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },

  styles: {
    global: {
      body: {
        bg: 'brand.900', // Set background color to brand.900
        color: 'brand.50', // Text color
      },
    },
  },
  components: {
    Badge: {
      baseStyle: {
        colorScheme: 'brand', // Use brand color scheme by default for Badge component
      },
    },
    Menu: {
      baseStyle: {
        list: {
          bg: 'brand.700', // Menu background color
          color: 'brand.50', // Menu text color
        },
        item: {
          bg: 'brand.700',
          color: 'brand.50',
          _hover: {
            bg: 'brand.600', // Hover state background color
          },
          _focus: {
            bg: 'brand.600', // Focus state background color
          },
        },
      },
    },
    IconButton: {
      baseStyle: {
        variant: 'solid',
        colorScheme: 'brand',
      },
    },
    Button: {
      baseStyle: {
        borderRadius: '9999px', // complete half-circle on each end
      },
      variants: {
        solid: {
          bg: 'brand.50',
          color: 'brand.800',
          _hover: {
            bg: 'brand.25',
          },
        },
        outline: {
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'brand.500',
            color: 'brand.800',
          },
        },
        ghost: {
          color: 'brand.500',
          _hover: {
            bg: 'brand.500',
            color: 'brand.800',
          },
        },
      },
    },
    Input: {
      variants: {
        filled: {
          field: {
            bg: 'brand.700', // Dark background color
            color: 'brand.50', // Light text color
            _hover: {
              bg: 'brand.900', // Darken on hover
            },
            _focus: {
              bg: 'brand.800', // Maintain dark background on focus
              borderColor: 'brand.50', // Border color on focus
            },
          },
        },
      },
    },
    Box: {
      baseStyle: {
        bg: 'brand.800',
        color: 'brand.50',
        borderWidth: 1,
        borderColor: 'brand.500',
        borderRadius: 'md',
        p: 2,
      },
    },
    Text: {
      baseStyle: {
        color: 'brand.50',
      },
    },
  },
});

export default customTheme;
