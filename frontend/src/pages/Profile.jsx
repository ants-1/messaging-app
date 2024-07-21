import Sidebar from "../components/Sidebar";
import { useState } from "react";

function Profile() {
  const dummyUser = {
    username: "Max",
    email: "maxsmith@email.com",
    password: "123",
    avater_url: "./default-avater.png",
    status: false,
  };

  const [email, setEmail] = useState(dummyUser.email);
  const [displayEmail, setDisplayEmail] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const toggleDisplayEmail = () => {
    setDisplayEmail((prevDisplayEmail) => !prevDisplayEmail);
  };

  const handleEmailSubmit = () => {
    dummyUser.email = email;
    setDisplayEmail(false);
  };

  return (
    <div className="flex text-white">
      <Sidebar />
      <div className="flex flex-col items-center w-full mt-20">
        <img
          src={dummyUser.avater_url}
          className="w-40 h-40 rounded-full border mb-10"
          alt="avater"
        />
        <div className="">
          <p className="mb-2">Email:</p>
          {displayEmail ? (
            <div className="flex items-baseline">
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                className="h-9 rounded-lg w-full max-w-96 bg-gray-700 border border-gray-600  text-gray-400 px-1 mr-3"
              />
              <button onClick={handleEmailSubmit} className="py-1 px-3 h-9 rounded-lg bg-indigo-600 hover:bg-indigo-700 mt-2 ">Save</button>
            </div>
          ) : (
            <p>{email}</p>
          )}
          <button onClick={toggleDisplayEmail} className="py-1 px-3 h-9 rounded-lg bg-indigo-600 hover:bg-indigo-700 mt-2 w-36">
            {displayEmail ? "Cancel" : "Change Email"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
