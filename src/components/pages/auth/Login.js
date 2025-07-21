import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { accessToken } from "../../hooks/useCookies";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axiosPrivet from "../../hooks/axiosPrivet";
import { useQuery } from "react-query";
import useValidToken from "../../hooks/useValidToken";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigator = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    data: result,
    isLoading,
    isError,
    error,
  } = useQuery(
    "getUser",
    async () => await axiosPrivet.get("users/getLoginUser")
  );
  const [isValidToken, tokenLoading] = useValidToken(result?.data?.user);
  const from = location.state?.from?.pathname;

  /*---------------- submit form start --------------*/
  const onSubmit = async (data) => {
    const username = data.email;
    const password = data.password;
    const info = { username, password };

    try {
      setIsLogin(true);
      const { data: result } = await axiosPrivet.post("login", info);
      Cookies.set(accessToken, result.token);
      const { data: userData } = await axiosPrivet.get(
        `users/getUserByEmail/${username}`
      );
      const role = userData?.user?.role;
      let defaultRoute;
      if (role === "admin") defaultRoute = "/admin";
      else if (role === "customer") defaultRoute = "/customer";
      else if (role === "deliveryAgent") defaultRoute = "/agent";
      const navigateTo = from?.includes(defaultRoute) ? from : defaultRoute;
      navigator(navigateTo, { replace: true });

      setIsLogin(false);
    } catch (error) {
      console.log("error.message", error.message);
      setIsLogin(false);
      toast.error("Login failed! Please try again", { autoClose: 1000 });
    }
  };
  /*---------------- submit form end --------------*/

  useEffect(() => {
    if (isValidToken) {
      let defaultRoute = "/";
      if (result?.data?.user?.role === "admin") defaultRoute = "/admin";
      else if (result?.data?.user?.role === "customer")
        defaultRoute = "/customer";
      else if (result?.data?.user?.role === "deliveryAgent")
        defaultRoute = "/agent";
      navigate(from || defaultRoute, { replace: true });
    }
  }, [from, navigate, isValidToken, location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="w-full max-w-md bg-white text-black shadow-2xl p-8 rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-primary mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            {errors.email && (
              <p className="text-error text-sm">{errors.email.message}</p>
            )}
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
            {errors.password && (
              <p className="text-error text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full">
            {isLogin || tokenLoading ? (
              <span className="btn-loading inline-block"></span>
            ) : (
              <span>Login</span>
            )}
          </button>
        </form>

        {/* Optional Link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/Register" className="text-primary font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
