import { AuthContext } from "../components/AuthContext";
import Sidebar from "../components/Sidebar";
import { useContext, useState, useEffect } from "react";

function Profile({ userId }) {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [email, setEmail] = useState("");
  const [displayEmail, setDisplayEmail] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/profile/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setProfile(data);
        setEmail(data.user.email);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [userId, user.token, user]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const toggleDisplayEmail = () => {
    setDisplayEmail((prevDisplayEmail) => !prevDisplayEmail);
  };

  const handleEmailSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/profile/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ email }),
        }
      );
      const updatedProfile = await response.json();
      console.log(updatedProfile);
      setProfile(updatedProfile);
      setDisplayEmail(false);
    } catch (error) {
      console.log("Error updating email", error);
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex text-white">
      <Sidebar />
      <div className="flex flex-col items-center w-full mt-20">
        <img
          src={profile.user.avatar_url}
          className="w-40 h-40 rounded-full border mb-10"
          alt="avatar"
        />
        <div className="mb-2">
          {profile.user.username}
        </div>
        <div>
          <p className="mb-2">Email:</p>
          {displayEmail ? (
            <div className="flex items-baseline">
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                className="h-9 rounded-lg w-full max-w-96 bg-gray-700 border border-gray-600 text-gray-400 px-1 mr-3"
              />
              <button
                onClick={handleEmailSubmit}
                className="py-1 px-3 h-9 rounded-lg bg-indigo-600 hover:bg-indigo-700 mt-2"
              >
                Save
              </button>
            </div>
          ) : (
            <p>{email}</p>
          )}
          <button
            onClick={toggleDisplayEmail}
            className="py-1 px-3 h-9 rounded-lg bg-indigo-600 hover:bg-indigo-700 mt-2 w-36"
          >
            {displayEmail ? "Cancel" : "Change Email"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
