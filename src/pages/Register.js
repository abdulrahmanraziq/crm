import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import './Register.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const { registerUser } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      name: '',  // Added name field
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(25, 'Name should be less than 25 characters')  // Validate the length of the name
        .required('Name is required'),  // Name is required
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Please confirm your password'),
    }),
    onSubmit: async (values, { resetForm }) => {
      // Call registerUser function from AuthContext
      await registerUser(values);
      resetForm(); // Reset form fields after submission
    },
  });

  return (
    <>
      <ToastContainer autoClose={2000} />

      <h3>Create your account here!</h3>

      <form onSubmit={formik.handleSubmit}>
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="form-label mt-4">
            Full Name
          </label>
          <input
            type="text"
            className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
            id="name"
            name="name"
            {...formik.getFieldProps('name')}
            placeholder="Enter your full name"
            required
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="invalid-feedback">{formik.errors.name}</div>
          ) : null}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="form-label mt-4">
            Email address
          </label>
          <input
            type="email"
            className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
            id="email"
            name="email"
            {...formik.getFieldProps('email')}
            placeholder="Enter email"
            required
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="invalid-feedback">{formik.errors.email}</div>
          ) : (
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="form-label mt-4">
            Password
          </label>
          <input
            type="password"
            className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
            id="password"
            name="password"
            {...formik.getFieldProps('password')}
            placeholder="Password"
            autoComplete="off"
            required
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="invalid-feedback">{formik.errors.password}</div>
          ) : null}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label htmlFor="confirmPassword" className="form-label mt-4">
            Confirm Password
          </label>
          <input
            type="password"
            className={`form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''}`}
            id="confirmPassword"
            name="confirmPassword"
            {...formik.getFieldProps('confirmPassword')}
            placeholder="Confirm Password"
            autoComplete="off"
            required
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
          ) : null}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary mt-4">
          Submit
        </button>
      </form>

      <p className="mt-3">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </>
  );
};

export default Register;
