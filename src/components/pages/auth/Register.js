import React from "react";
import { useForm } from "react-hook-form";
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from "axios";


const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigator = useNavigate();


  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/api/v1/users", data);
        if(response.status == 200 && response.data.token){
            navigator('/Login');
        }
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
    }
  };

  const password = watch("password");

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="w-full max-w-md bg-white text-black shadow-2xl p-8 rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-primary mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="label">
              <span className="label-text text-black">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="input input-bordered w-full bg-white text-black border-gray-300"
              {...register("displayName", { required: "Name is required" })}
            />
            {errors.displayName && <p className="text-error text-sm">{errors.displayName.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text text-black">Email Address</span>
            </label>
            <input
              type="email"
              placeholder="Your email"
              className="input input-bordered w-full bg-white text-black border-gray-300"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <p className="text-error text-sm">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span className="label-text text-black">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="input input-bordered w-full bg-white text-black border-gray-300"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && <p className="text-error text-sm">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="label">
              <span className="label-text text-black">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              className="input input-bordered w-full bg-white text-black border-gray-300"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-error text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Create Account
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/Login" className="text-primary font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
