import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fetchMock from "jest-fetch-mock";
import Profile from "../app/(home)/profile/page";
import * as ToastHook from "../components/ui/use-toast";

fetchMock.enableMocks();

jest.mock("next/navigation", () => ({ useRouter: jest.fn() }));
jest.mock("next-auth/react", () => ({
  useSession: jest.fn().mockReturnValue({
    data: { user: { id: "user-id" } },
    status: "authenticated",
  }),
  signOut: jest.fn(),
}));

jest.mock("../components/ui/use-toast");

describe("Profile Component", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    ToastHook.useToast.mockReturnValue({ toast: jest.fn() });
  });

  it("updates username successfully", async () => {
    render(<Profile />);

    // Mock fetch to simulate a successful API call for updating the username
    fetchMock.mockResponseOnce(JSON.stringify({ success: true }));

    // Simulate clicking the pencil icon to edit the username
    fireEvent.click(screen.getByTestId("edit-profile-button"));

    // // Simulate user input for the new username
    const usernameInput = screen.getByLabelText(/username/i);
    await userEvent.clear(usernameInput);
    await userEvent.type(usernameInput, "newusername");
    expect(usernameInput).toHaveValue("newusername");

    // // Simulate clicking the save changes button
    fireEvent.click(screen.getByText(/Save Changes/i));

    // // Wait for the fetch call to be made and then check if it was called correctly
    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/profile",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            username: "newusername",
            uid: "user-id",
          }),
        })
      )
    );

    // // Check if the success toast was displayed
    await waitFor(() =>
      expect(ToastHook.useToast().toast).toHaveBeenCalledWith(
        expect.objectContaining({ description: "User updated." })
      )
    );
  });

  beforeEach(() => {
    fetchMock.resetMocks();
    ToastHook.useToast.mockReturnValue({ toast: jest.fn() });
  });

  it("updates username error", async () => {
    render(<Profile />);

    // Mock fetch to simulate a successful API call for updating the username
    fetchMock.mockResponseOnce(JSON.stringify({ error: true }));

    // Simulate clicking the pencil icon to edit the username
    fireEvent.click(screen.getByTestId("edit-profile-button"));

    // // Simulate user input for the new username
    const usernameInput = screen.getByLabelText(/username/i);
    await userEvent.clear(usernameInput);
    await userEvent.type(usernameInput, "newusername");
    expect(usernameInput).toHaveValue("newusername");

    // // Simulate clicking the save changes button
    fireEvent.click(screen.getByText(/Save Changes/i));

    // // Wait for the fetch call to be made and then check if it was called correctly
    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/profile",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            username: "newusername",
            uid: "user-id",
          }),
        })
      )
    );

    // // Check if the error toast was displayed
    await waitFor(() =>
      expect(ToastHook.useToast().toast).toHaveBeenCalledWith(
        expect.objectContaining({
          description: "true",
          duration: 3000,
          title: "Uh oh! Something went wrong.",
          variant: "destructive",
        })
      )
    );
  });

  beforeEach(() => {
    fetchMock.resetMocks();
    ToastHook.useToast.mockReturnValue({ toast: jest.fn() });
  });

  it("delete account successfully", async () => {
    render(<Profile />);

    // Mock fetch to simulate a successful API call for updating the password
    fetchMock.mockResponseOnce(JSON.stringify({ success: true }));

    // Simulate clicking the pencil icon to open modal
    fireEvent.click(screen.getByTestId("delete-profile-button"));

    // // Simulate user input for the password
    const passwordInput = screen.getByLabelText(/password/i);
    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, "password123");
    expect(passwordInput).toHaveValue("password123");

    // // Simulate clicking the delete button
    fireEvent.click(screen.getByText(/Delete My Account/i));

    // // Wait for the fetch call to be made and then check if it was called correctly
    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/profile",
        expect.objectContaining({
          method: "DELETE",
          body: JSON.stringify({
            password: "password123",
          }),
        })
      )
    );

    // // Check if the success toast was displayed
    await waitFor(() =>
      expect(ToastHook.useToast().toast).toHaveBeenCalledWith(
        expect.objectContaining({ description: "User deleted." })
      )
    );
  });

  beforeEach(() => {
    fetchMock.resetMocks();
    ToastHook.useToast.mockReturnValue({ toast: jest.fn() });
  });

  it("delete account error", async () => {
    render(<Profile />);

    // Mock fetch to simulate a successful API call for updating the password
    fetchMock.mockResponseOnce(JSON.stringify({ error: true }));

    // Simulate clicking the pencil icon to open modal
    fireEvent.click(screen.getByTestId("delete-profile-button"));

    // // Simulate user input for the password
    const passwordInput = screen.getByLabelText(/password/i);
    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, "password123");
    expect(passwordInput).toHaveValue("password123");

    // // Simulate clicking the delete button
    fireEvent.click(screen.getByText(/Delete My Account/i));

    // // Wait for the fetch call to be made and then check if it was called correctly
    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/profile",
        expect.objectContaining({
          method: "DELETE",
          body: JSON.stringify({
            password: "password123",
          }),
        })
      )
    );

    // // Check if the error toast was displayed
    await waitFor(() =>
      expect(ToastHook.useToast().toast).toHaveBeenCalledWith(
        expect.objectContaining({
          description: "true",
          duration: 3000,
          title: "Uh oh! Something went wrong.",
          variant: "destructive",
        })
      )
    );
  });
});
