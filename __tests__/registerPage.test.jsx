// Import necessary utilities from React Testing Library and Jest
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fetchMock from "jest-fetch-mock";
import Register from "../app/(auth)/register/page";
import * as ToastHook from "../components/ui/use-toast";
import { useRouter } from "next/navigation";

// Enable fetch mocks
fetchMock.enableMocks();

// Mock useToast hook
jest.mock("next-auth/react");
jest.mock("next/navigation", () => ({ useRouter: jest.fn() }));
jest.mock("../components/ui/use-toast");

describe("Register Component", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    // Reset all mocks
    fetchMock.resetMocks();
    jest.clearAllMocks();
    // Mock the useRouter hook to simulate navigation
    useRouter.mockImplementation(() => ({
      push: mockPush,
    }));
    // Mock useToast to return a toast function
    ToastHook.useToast.mockReturnValue({ toast: jest.fn() });
  });

  it("navigates to login page on successful registration", async () => {
    // Mock fetch to simulate a successful API call
    fetchMock.mockResponseOnce(JSON.stringify({ success: true }));

    render(<Register />);

    // Simulate user input and form submission
    await userEvent.type(screen.getByPlaceholderText(/username/i), "newuser");
    await userEvent.type(
      screen.getByPlaceholderText(/email/i),
      "newuser@example.com"
    );
    await userEvent.type(
      screen.getByPlaceholderText(/password/i),
      "password123"
    );
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

    // Wait for the fetch call to be made
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());

    // Check if navigation to the login page was triggered
    expect(mockPush).toHaveBeenCalledWith("/login");

    // Optionally, check for a success toast message
    expect(ToastHook.useToast().toast).toHaveBeenCalledWith(
      expect.objectContaining({
        description: "Register success.",
        duration: 1000,
      })
    );
  });

  beforeEach(() => {
    // Reset all mocks
    fetchMock.resetMocks();
    jest.clearAllMocks();
    // Mock useToast to return a toast function
    ToastHook.useToast.mockReturnValue({ toast: jest.fn() });
  });

  it("shows an error toast on failed registration due to invalid credentials", async () => {
    // Mock fetch to simulate an API call returning an error
    fetchMock.mockResponseOnce(
      JSON.stringify({ error: "Invalid credentials" })
    );

    render(<Register />);

    // Simulate user input
    await userEvent.type(screen.getByPlaceholderText(/username/i), "testuser");
    await userEvent.type(
      screen.getByPlaceholderText(/email/i),
      "test@example.com"
    );
    await userEvent.type(screen.getByPlaceholderText(/password/i), "password");
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

    // Wait for the fetch call to be made
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());

    // Check if the toast function was called with the expected error message
    expect(ToastHook.useToast().toast).toHaveBeenCalledWith(
      expect.objectContaining({
        description: "Invalid credentials",
        duration: 1000,
        variant: "destructive",
      })
    );
  });
});
