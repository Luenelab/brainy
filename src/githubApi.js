// githubApi.js

import axios from 'axios';

const token = process.env.REACT_APP_GITHUB_TOKEN;
const user = 'luenelab';
const repo = 'brainy_data';
const path = 'brain_sourcefiles'; // Assuming this is where .md files are stored

const api = axios.create({
  baseURL: `https://api.github.com/repos/${user}/${repo}/contents/${path}`,
  headers: {
    Authorization: `token ${token}`,
  },
});

export const getFileContents = async (filename) => {
  try {
    const response = await api.get(`/${filename}`);
    return response.data; // File content is base64 encoded in response.data.content
  } catch (error) {
    console.error('Error fetching file:', error);
    return null;
  }
};

export const createOrUpdateFile = async (filename, content) => {
  try {
    // Check if file already exists
    const existingFile = await getFileContents(filename);

    if (existingFile) {
      // Update existing file
      const response = await api.put(`/${filename}`, {
        message: `Update ${filename}`,
        content: Buffer.from(content).toString('base64'),
        sha: existingFile.sha,
      });
      return response.data.commit; // Return commit data upon successful update
    } else {
      // Create new file
      const response = await api.put(`/${filename}`, {
        message: `Create ${filename}`,
        content: Buffer.from(content).toString('base64'),
      });
      return response.data.commit; // Return commit data upon successful creation
    }
  } catch (error) {
    console.error('Error creating or updating file:', error);
    return null;
  }
};
