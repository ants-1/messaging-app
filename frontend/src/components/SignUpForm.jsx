import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

function SignUpForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");
  const [signUpError, setSignUpError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Sign Up successful", result);
        login(result.token);
        navigate("/");
      } else {
        console.log("Error Signing Up", result);
        setSignUpError(result.message || "Sign up Failed");
      }
    } catch (error) {
      console.log("An error occurred", error);
      setSignUpError("*Sign up Failed. Please try again.");
    }
  };

  return (
    <form
      className="flex flex-col bg-gray-800 text-white sm:w-[29rem] w-80 p-10 rounded-lg border border-gray-600"
      onSubmit={handleSubmit(onSubmit)}
      method="POST"
    >
      <h1 className="text-center mb-3 font-bold text-3xl">Sign Up</h1>
      <div className="flex flex-col mb-5">
        <label htmlFor="username" className="text-md font-medium mb-2">
          Username:
        </label>
        <input
          type="text"
          className="h-10 bg-gray-700 border border-gray-600  text-gray-400 rounded-lg px-1"
          name="username"
          id="username"
          required
          {...register("username", { required: true })}
        />
        {errors.username && (
          <p className="text-red-500 text-sm mb-2">*Username is required</p>
        )}
      </div>
      <div className="flex flex-col mb-5">
        <label htmlFor="email" className="text-md font-medium mb-2">
          Email:
        </label>
        <input
          type="text"
          className="h-10 bg-gray-700 border border-gray-600  text-gray-400 rounded-lg px-1"
          name="email"
          id="email"
          required
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">
            *Email is required and must be valid
          </p>
        )}
      </div>
      <div className="flex flex-col mb-5">
        <label htmlFor="password" className="text-md font-medium mb-2">
          Password:
        </label>
        <input
          type="text"
          className="h-10 bg-gray-700 border border-gray-600  text-gray-400 rounded-lg px-1"
          name="password"
          id="password"
          required
          {...register("password", { required: true })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-2">*Password is required</p>
        )}
      </div>
      <div className="flex flex-col mb-8">
        <label htmlFor="confirm-password" className="text-md font-medium mb-2">
          Confirm Password:
        </label>
        <input
          type="text"
          className="h-10 bg-gray-700 border border-gray-600  text-gray-400 rounded-lg px-1"
          name="confirm-password"
          id="confirm-password"
          required
          {...register("confirmPassword", {
            required: true,
            validate: (value) => value === password || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mb-2">
            *
            {errors.confirmPassword.message
              ? errors.confirmPassword.message
              : "Confirm Password is required"}
          </p>
        )}
      </div>
      {signUpError && <p className="text-red-500 text-sm">{signUpError}</p>}
      <button
        type="submit"
        className="rounded-md h-12 bg-indigo-600  mb-5 font-semibold hover:bg-indigo-700"
      >
        Sign Up
      </button>
      <p className="font-thin">
        Already have an account?{" "}
        <Link to="/" className="text-blue-600 underline font-semibold">
          Login
        </Link>
        .
      </p>
    </form>
  );
}

export default SignUpForm;
