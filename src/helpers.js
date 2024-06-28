// helpers.js
export const checkAndSetUniqueUsername = (username) => {
  // Logic to check if the username exists in the repo
  // If exists, append a number to make it unique
  // This is a simplified version; in a real app, you would query your backend or GitHub API
  const existingUsernames = ['username1', 'username2']; // Example existing usernames
  let uniqueUsername = username;
  let counter = 1;

  while (existingUsernames.includes(uniqueUsername)) {
    uniqueUsername = `${username}-${counter}`;
    counter++;
  }

  return uniqueUsername;
};
