import { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import io from "socket.io-client";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import { AuthContext } from "./components/AuthContext";
import ChatForm from "./components/ChatForm";

function App() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="bg-gray-900">
      <Routes>
        <Route
          index
          path="/"
          element={user ? <Navigate to="/chats" /> : <Navigate to="/login" />}
        />
        <Route
          path="/sign-up"
          element={user ? <Navigate to="/chats" /> : <SignUp />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/chats" /> : <Login />}
        />
        <Route
          path="/chats"
          element={user ? <Chat /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile/:userId"
          element={user ? <Profile userId={user.userId} /> : <Navigate to="/login" />}
        />
        <Route 
          path="/add-chat"
          element={user ? <ChatForm /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
