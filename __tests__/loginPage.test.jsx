import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { signIn } from "next-auth/react";
import Login from "../app/(auth)/login/page";
import * as ToastHook from "../components/ui/use-toast";

// Mock Next.js router and next-auth
jest.mock("next/navigation", () => ({ useRouter: jest.fn() }));
jest.mock("next-auth/react");
jest.mock("../components/ui/use-toast");

describe("Login Page", () => {
  beforeEach(() => {
    signIn.mockReset();
  });

  it("should allow a user to type into email and password fields", async () => {
    render(<Login />);

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    await userEvent.type(emailInput, "teddirdesigner@gmail.com");
    await userEvent.type(passwordInput, "123123123");

    expect(emailInput).toHaveValue("teddirdesigner@gmail.com");
    expect(passwordInput).toHaveValue("123123123");
  });

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    // Mock signIn to simulate an error
    signIn.mockResolvedValue({ error: "CredentialsSignin" });
    // Mock useToast to return a function that does nothing (or logs to console)
    ToastHook.useToast.mockReturnValue({ toast: jest.fn() });
  });

  it("shows an error toast on invalid credentials", async () => {
    render(<Login />);

    // Fill in the form
    await userEvent.type(
      screen.getByPlaceholderText(/email/i),
      "wrong@example.com"
    );
    await userEvent.type(
      screen.getByPlaceholderText(/password/i),
      "wrongpassword"
    );
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

    // Wait for the signIn function to be called
    await waitFor(() =>
      expect(signIn).toHaveBeenCalledWith(
        "credentials",
        expect.objectContaining({
          redirect: false,
          email: "wrong@example.com",
          password: "wrongpassword",
        })
      )
    );

    // Check if the toast function was called after the failed login attempt
    expect(ToastHook.useToast().toast).toHaveBeenCalledWith(
      expect.objectContaining({
        description: expect.stringContaining("Invalid credentials"),
      })
    );
  });
});
