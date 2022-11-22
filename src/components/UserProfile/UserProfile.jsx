import { useContext, useEffect, useState } from "react";
import { getAllUsers } from "../../service/service-users";
import AuthContext from "../../store/auth-context";

const UserProfile = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();
  const [userId, setCurrentUserId] = useState("");
  const authCtx = useContext(AuthContext);
  const userEmail = authCtx.userEmail;
  const getCurrentUserId = async (userEmail) => {
    const allUsers = await getAllUsers();
    allUsers.forEach((user) => {
      if (user.email === userEmail) {
        setCurrentUserId(user.id);
      }
    });
  };
  getCurrentUserId(userEmail);
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      const response = await fetch(
        `https://happily-insured-default-rtdb.europe-west1.firebasedatabase.app/user/${userId}.json`
      );
      if (!response.ok) {
        setHttpError(response.message);
        throw new Error(
          "Something went wrong with fetching the data of the current user."
        );
      }
      const responseData = await response.json();
      const loadedUserData = responseData;
      setUserData(loadedUserData);
      setIsLoading(false);
    };
    fetchUserData().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [userId]);

  const userCard = (
    <div className="card">
      <p>Name: {userData.firstName}</p>
      <p>Surname: {userData.lastName}</p>
      <p>Years: {userData.years}</p>
      <p>Country: {userData.country}</p>
    </div>
  );

  return (
    <>
      <div className="sectionForm">Hello, {userEmail}</div>
      <div>
        {isLoading && (
          <h3>
            <span className="loading">Loading insurances...</span>
          </h3>
        )}
        {httpError && (
          <h3>
            <span className="error">{httpError}</span>
          </h3>
        )}
        {!httpError && !isLoading && userCard}
      </div>
    </>
  );
};

export default UserProfile;
