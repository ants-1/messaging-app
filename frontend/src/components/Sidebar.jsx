import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function Sidebar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlelogout = () => {
    logout();
    navigate("/");
  }

  return (
    <div>
      <aside className="w-16 bg-gray-800 h-screen">
        <ul className="flex flex-col items-center">
          <li className="text-white hover:cursor-pointer hover:bg-gray-900 w-full">
            <Link to="/chats">
              <img
                src="./chat-icon-normal.png"
                alt=""
                className="w-full h-16 p-3.5"
              />
            </Link>
          </li>
          <li className="text-gray-500 hover:cursor-pointer hover:bg-gray-900 w-full">
            <Link to="/profile">
              <img
                src="./profile-icon.png"
                alt=""
                className="w-full h-16 p-3.5"
              />
            </Link>
          </li>
          <li className="text-gray-500 hover:cursor-pointer hover:bg-gray-900 w-full">
            <div onClick={handlelogout}>
              <img
                src="./logout-icon.png"
                alt=""
                className="w-full h-16 p-3.5"
              />
            </div>
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default Sidebar;
