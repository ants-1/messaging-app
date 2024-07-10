import { Link } from "react-router-dom";

function Sidebar() {
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
            <Link to="/logout">
              <img
                src="./logout-icon.png"
                alt=""
                className="w-full h-16 p-3.5"
              />
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default Sidebar;
