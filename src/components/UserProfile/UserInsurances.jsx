import { useState, useEffect, useContext } from "react";
import { getUserInsurances } from "../../service/service-insurances";
import { getAllUsers } from "../../service/service-users";
import AuthContext from "../../store/auth-context";

const UserInsurances = () => {
  const [insurances, setInsurances] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();
  const [currentUserId, setCurrentUserId] = useState("");

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
    const fetchInsurances = async () => {
      setIsLoading(true);
      const loadedInsurances = await getUserInsurances(currentUserId);
      setInsurances(loadedInsurances);
      setIsLoading(false);
    };

    fetchInsurances().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [currentUserId]);

  const insurancesList = insurances.map((insurance) => (
    <div key={insurance.id} className="sectionForm">
      <p>Name: {insurance.insuranceName}</p>
      <p>Price: {insurance.insurancePrice}</p>
      <p>Driving experience of the customer: {insurance.drivingExperience}</p>
      <p>Registration number of the car: {insurance.registrationNumber}</p>
      <p>Vehicle register document: {insurance.vehicleRegisterDocument}</p>
    </div>
  ));

  return (
    <>
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

      {!httpError && !isLoading && insurancesList.length > 0 && insurancesList}
    </>
  );
};

export default UserInsurances;
