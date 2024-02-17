# Website Documentation

Welcome to our website documentation. This guide provides comprehensive instructions and insights on using, developing, and testing the website built with Next.js 14, focusing on new features like the App Router and API Routes within the App Directory. We utilize Zustand for state management, Firebase as our database solution, and Jest for testing.

## Table of Contents

1. [Introduction](#introduction)
2. [App Router in Next.js 14](#app-router-in-nextjs-14)
3. [API Router](#api-router)
4. [State Management with Zustand](#state-management-with-zustand)
5. [Firebase Integration](#firebase-integration)
6. [Testing with Jest](#testing-with-jest)
7. [Running Tests](#running-tests)
8. [Installation](#installation)
9. [Contributing](#contributing-to-the-project)

## Introduction

This project leverages Next.js 14, offering the latest in SSR, SSG, and ISR capabilities, with the addition of the new App Router and API Routes within the App Directory for streamlined routing. Zustand replaces React Context for more efficient state management, while Firebase serves as the backend database. Jest is utilized for unit and integration testing to ensure code quality.

## App Router in Next.js 14

Next.js 14 introduces the App Router, a new routing mechanism that simplifies page transitions and data fetching. It is defined within the `app` directory, allowing for more intuitive and organized routing logic. The App Router supports file-based routing with enhanced capabilities for dynamic routes, middleware, and layout nesting.

### Features:

- **File-Based Routing**: Automatically routes files in the `app/pages` directory.
- **Dynamic Routes**: Supports dynamic segments, catch-all, and optional catch-all routes.
- **Layout Nesting**: Allows for shared layouts across pages, improving code reuse.

## API Router

The API Router, part of the App Directory, provides a streamlined way to create API routes. By placing `[...].ts` or `[...].js` files within the `app/api` directory, you can handle API requests directly, simplifying backend communication and server-side logic.

### Creating an API Route:

Create a file within `app/api` and export a function that handles the request and response objects.

```javascript
// app/api/hello/route.tsx

export async function GET(req) {
  NextResponse.json(
    {
      status: "success",
      name: "John Doe",
    },
    { status: 200 }
  );
}
```

## State Management with Zustand

Zustand is a fast and scalable state management solution that replaces React Context for managing global states in the app. It offers a simpler and more efficient way to share state across components.

### Setup Zustand Store:

```javascript
// store.js
import create from "zustand";

export const useStore = create((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
}));
```

## Firebase Integration

Firebase is integrated as the backend database solution, providing a scalable and secure database for storing and syncing data in real-time.

### Firebase Configuration:

Create `firebase.config.js` and replace the placeholders with your Firebase project credentials:

```javascript
// firebase.config.js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

export default firebaseConfig;
```

Update environment variables in `.env.example` for sensitive credentials.

## Testing with Jest

Jest is used for writing unit and integration tests, ensuring that components and functions behave as expected.

### Configuration:

Ensure Jest is configured to work with Next.js and TypeScript by setting up `jest.config.js` and installing necessary packages like `@testing-library/react`, `@testing-library/user-event` and `@testing-library/jest-dom`.

## Running Tests

Tests are located in the `__tests__` directory, following the naming convention `<componentName>.test.jsx`. To run the tests, execute the following command:

```bash
npm run test
npm run test loginPage.test.jsx
```

### Example Tests:

- **loginPage.test.jsx**: Tests login functionality and form validation.
- **profilePage.test.jsx**: Verifies profile update and error handling.
- **registerPage.test.jsx**: Checks the registration process and input validation.

---

This documentation provides a foundational overview to get started with the project. For further details, refer to specific documentation on Next.js, Zustand, Firebase, and Jest.

## Running the Website

This section guides you through the process of getting the website up and running on your local machine, from cloning the repository to starting the development server.

### Cloning the Repository

1. **Find the Repository URL**: Navigate to the GitHub page of the project and locate the repository's URL. It should look something like `https://github.com/Teddir/crud-nextjs-zustand-firebase`.

2. **Clone the Repository**: Open a terminal on your computer and run the following command, replacing `https://github.com/Teddir/crud-nextjs-zustand-firebase.git` with the actual URL of the repository:

   ```bash
   git clone https://github.com/Teddir/crud-nextjs-zustand-firebase.git
   ```

   This command downloads the project files to your local machine.

### Installation

Once you have cloned the repository, you need to install the necessary dependencies to run the project.

1. **Navigate to the Project Directory**: Change your current directory to the project's root directory using the `cd` command:

   ```bash
   cd crud-nextjs-zustand-firebase
   ```

   Replace `crud-nextjs-zustand-firebase` with the name of the folder created by the `git clone` command.

2. **Install Dependencies**: Run the following command to install the project dependencies:

   - Using npm:

     ```bash
     npm install
     ```

   - Using Yarn:

     ```bash
     yarn
     ```

   This command reads the `package.json` file and installs the required packages listed under `dependencies` and `devDependencies`.

### Running the Development Server

With the dependencies installed, you can now start the development server.

- **Using npm**:

  ```bash
  npm run dev
  ```

- **Using Yarn**:

  ```bash
  yarn dev
  ```

This command starts the Next.js development server, usually accessible at `http://localhost:3000` in your web browser. You should see the website running and be able to interact with it.

### Summary

By following these steps, you've cloned the project repository, installed its dependencies, and started the development server. You're now ready to explore the website's functionality, make changes, and test them in real-time. Remember to consult the project's README or other documentation for any specific setup instructions or environment variables that might be required.

## Contributing to the Project

If you're interested in contributing to the project, here's a guide to help you get started with making changes and submitting your contributions.

### Creating a New Branch

Before making any changes, it's a good practice to create a new branch. This keeps the master branch stable and makes it easier to manage multiple contributions.

1. **Check Out to the Master Branch**: Ensure you're on the master branch and it's up to date.

   ```bash
   git checkout master
   git pull origin master
   ```

2. **Create and Switch to a New Branch**: Replace `<branch-name>` with a descriptive name for your new branch.

   ```bash
   git checkout -b <branch-name>
   ```

### Making Changes

With your new branch checked out, you're ready to make changes. Feel free to edit, add or remove files as necessary for your contribution.

### Committing Changes

After making changes, you should commit them to your branch using meaningful commit messages. We follow conventional commit messages to make the history more readable and to automate versioning and changelog generation.

#### Commit Message Format

- `feat`: Introduces a new feature.
- `fix`: Fixes a bug.
- `docs`: Adds or updates documentation.
- `add`: Adds files or assets.

#### Example Commit

After staging your changes with `git add`, you can commit them:

```bash
git commit -m "feat: add user profile page"
```

This message indicates you've added a new feature, specifically a user profile page.

### Pushing Changes

Once your changes are committed, push them to the remote repository:

```bash
git push origin <branch-name>
```

### Submitting a Pull Request

After pushing your changes, go to the repository on GitHub. You should see an option to "Compare & pull request." Click it, provide a detailed description of your changes, and submit the pull request (PR).

### Best Practices for Contribution

- **Keep PRs Small**: Aim for small, manageable PRs that address specific issues or introduce single features. This makes reviewing easier.
- **Update Tests**: If your changes affect the code's behavior, update existing tests or add new ones as necessary.
- **Follow Project Guidelines**: Adhere to any contribution guidelines provided in the project's README or contributing guide.
- **Engage in the Review Process**: Respond to comments and requests from the project maintainers during the PR review process.

By following these steps and best practices, you can effectively contribute to the project and collaborate with the community.
