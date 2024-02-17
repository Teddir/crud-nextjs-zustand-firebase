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

Update environment variables in `.env.local` for sensitive credentials.

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
