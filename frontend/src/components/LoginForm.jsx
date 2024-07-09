import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Login successful", result);
        login(result.token);
        navigate("/");
      } else {
        console.error("Login failed", result);
        setLoginError(result.message || "Login failed");
      }
    } catch (error) {
      console.error("An error occurred", error);
      setLoginError("*Login Failed. Please try again.");
    }
  };

  return (
    <form
      className="flex flex-col bg-gray-800 text-white sm:w-[29rem] w-80 p-10 rounded-lg border border-gray-600"
      onSubmit={handleSubmit(onSubmit)}
      method="POST"
    >
      <h1 className="text-center mb-3 font-bold text-3xl">Login</h1>
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
      <div className="flex flex-col mb-8">
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
          <p className="text-red-500 text-sm">*Password is required</p>
        )}
      </div>
      {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
      <button
        type="submit"
        className="rounded-md h-12 bg-indigo-600  mb-5 font-semibold"
      >
        Login
      </button>
      <p className="font-thin">
        Not signed up?{" "}
        <Link to="/sign-up" className="text-blue-600 underline font-semibold">
          Register here
        </Link>
        .
      </p>
    </form>
  );
}

export default LoginForm;
