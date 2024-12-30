import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
  
const Login = () => {
  const { loginUser } = useContext(AuthContext); // Access the loginUser function
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await loginUser(values); // Call loginUser function from AuthContext
        toast.success('Login successful!');
        
        // Redirect to the dashboard after successful login
        navigate("/dashboard");

      } catch (error) {
        toast.error(error.message); // Show error message
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <ToastContainer autoClose={2000} />
      <h3>Login</h3>

      <form onSubmit={formik.handleSubmit}>
        {/* Email Field */}
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
            {...formik.getFieldProps('email')}
            placeholder="Enter email"
            required
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="invalid-feedback">{formik.errors.email}</div>
          ) : null}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
            {...formik.getFieldProps('password')}
            placeholder="Password"
            required
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="invalid-feedback">{formik.errors.password}</div>
          ) : null}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary mt-4" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      
      <p className="mt-3">
        Don't have an account? <Link to="/register">Create One</Link>
      </p>

    </>
  );
};

export default Login;
