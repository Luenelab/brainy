// src/utils/todoUtils.js

import axios from 'axios';

export const parseTodosData = (content) => {
  const decodedContent = atob(content);
  const parsedData = decodedContent.split('\n').map(line => line.trim());
  const todos = parsedData.filter(item => item.startsWith('- [ ]')).map(item => ({ id: Date.now(), text: item.replace('- [ ] ', '') }));
  const completedTodos = parsedData.filter(item => item.startsWith('- [x]')).map(item => ({ id: Date.now(), text: item.replace('- [x] ', '') }));
  return { todos, completedTodos };
};

export const fetchTodosFromGitHub = async () => {
  try {
    const response = await axios.get(
      'https://raw.githubusercontent.com/Luenelab/brainy_data/main/brain_sourcefiles/raphael.md',
      {
        headers: {
          'Authorization': `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an error
      console.error('Error setting up the request:', error.message);
    }
    throw error;
  }
};


export const createRaphaelFile = async () => {
  const initialContent = ''; // Initial content for raphael.md
  try {
    await axios.put(
      'https://api.github.com/repos/Luenelab/brainy_data/contents/brain_sourcefiles/raphael.md',
      {
        message: 'Create raphael.md from app',
        content: btoa(initialContent),
      },
      {
        headers: {
          'Authorization': `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      }
    );
    return { success: true };
  } catch (error) {
    console.error('Error creating raphael.md:', error);
    throw error;
  }
};

export const generateTodosContent = (todos, completedTodos) => {
  const todosMarkdown = todos.map(todo => `- [ ] ${todo.text}`).join('\n');
  const completedTodosMarkdown = completedTodos.map(todo => `- [x] ${todo.text}`).join('\n');
  return `${todosMarkdown}\n${completedTodosMarkdown}`;
};
