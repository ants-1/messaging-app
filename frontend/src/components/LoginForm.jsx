import { Link } from "react-router-dom";

function LoginForm() {
  return (
    <form
      className="flex flex-col bg-gray-800 text-white sm:w-[30rem] w-80 p-10 rounded-lg"
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
        />
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
        />
      </div>
      <button
        type="submit"
        className="rounded-md h-12 bg-indigo-600  mb-3 font-semibold"
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
