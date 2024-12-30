import { createContext, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Create AuthContext
export const AuthContext = createContext();

// Create AuthContextProvider component
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Login request function
  const loginUser = async (userData) => {
    try {
      const res = await fetch("http://localhost:10000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      // Check if response is successful
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        setUser(data.user);
        console.log("User logged in:", data.user);
        return data.user;
      }
    } catch (error) {
      console.log("Error during login:", error.message);
      throw error;
    }
  };

  // Register request function
  const registerUser = async (userData) => {
    try {
      const res = await fetch("http://localhost:10000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await res.json();

      if (res.ok) {
        // Notify user of success
        toast.success('Registration successful!');
        return result; // Return the result if needed
      } else {
        throw new Error(result.message || 'Registration failed');
      }
    } catch (error) {
      console.log("Error during registration:", error.message);
      toast.error(error.message); // Show error message
    }
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};
