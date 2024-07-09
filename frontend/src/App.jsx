import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Chat from "./pages/Chat";
import { AuthProvider } from "./components/AuthContext";

function App() {
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
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/" element={<Chat />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
