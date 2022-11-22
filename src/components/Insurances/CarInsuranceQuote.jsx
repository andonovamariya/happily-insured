import { useState, useEffect, useRef, useContext } from "react";
import { buyInsurance } from "../../service/service-insurances";
import { getAllUsers } from "../../service/service-users";
import AuthContext from "../../store/auth-context";
import Button from "../UI/Button";

import styles from "./Insurances.module.css";

const CarInsuranceQuote = () => {
  const authCtx = useContext(AuthContext);
  const userEmail = authCtx.userEmail;
  const [showForm, setShowForm] = useState(true);
  const [price, setPrice] = useState(0);
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [vehicleRegisterDocument, setVehicleRegisterDocument] = useState("");
  const [drivingExperience, setDrivingExperience] = useState("");
  const [userId, setUserId] = useState("");

  const [disable, setDisabled] = useState(true);
  const [errorDrExp, setErrorDrExp] = useState("");
  const [discountMessage, setDiscountMessage] = useState("");
  const firstRender = useRef(true);

  const getCurrentUserId = async (userEmail) => {
    const allUsers = await getAllUsers();
    allUsers.forEach((user) => {
      if (user.email === userEmail) {
        console.log(user);
        setUserId(user.id);
      }
    });
  };
  getCurrentUserId(userEmail);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!errorDrExp) {
      setShowForm(false);
      let carInsuranceData = {
        registrationNumber,
        vehicleRegisterDocument,
        drivingExperience,
      };
      const calculatedPrice = calculatePrice(carInsuranceData);
      setPrice(calculatedPrice);
    } else {
      alert("You have entered invalid input. Please check the form again.");
    }
  };

  const calculatePrice = (carInsuranceData) => {
    const initialDiscount = 10;
    let sumPrice = 0;
    const startPrice = 100;
    if (parseFloat(carInsuranceData.drivingExperience) >= 10) {
      const discountedAmount = (initialDiscount * startPrice) / 100;
      sumPrice = startPrice - discountedAmount;
    } else {
      sumPrice = 100;
    }
    return sumPrice;
  };

  const handleRegistrationNumberChange = (event) => {
    setRegistrationNumber(event.target.value);
  };

  const handleVehicleRegisterDocumentChange = (event) => {
    setVehicleRegisterDocument(event.target.value);
  };

  const handleDrivingExperienceChange = (event) => {
    setDrivingExperience(event.target.value);
  };

  const handleBuyInsurance = () => {
    const insuranceData = {
      insuranceName: "Car Insurance",
      insurancePrice: price,
      registrationNumber: registrationNumber,
      vehicleRegisterDocument: vehicleRegisterDocument,
      drivingExperience: drivingExperience,
      dateOfBuying: new Date(),
    };
    buyInsurance(insuranceData, userId).catch((error) => {
      console.log("You couldn't buy this insurance", error);
    });
    alert(
      "You have successfully bought the insurance. You can see the insurance's information in your profile."
    );
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const formValidation = () => {
      if (drivingExperience < 0) {
        setErrorDrExp("Driving experience can't be a negative number.");
        setDiscountMessage("");
        return true;
      } else if (drivingExperience >= 10) {
        setErrorDrExp("");
        setDiscountMessage(
          "You have driving experience, which is acceptable for a special discount offer."
        );
        return false;
      } else {
        setErrorDrExp("");
        setDiscountMessage("");
        return false;
      }
    };
    setDisabled(formValidation());
  }, [registrationNumber, vehicleRegisterDocument, drivingExperience]);

  return (
    <>
      {showForm ? (
        <section className="sectionForm">
          <h3>Calculate price for Car Insurance</h3>
          <form>
            <div className="control">
              <label htmlFor="regNumber">Registration number:</label>
              <input
                type="text"
                id="regNumber"
                required
                onChange={handleRegistrationNumberChange}
                value={registrationNumber}
              />
            </div>
            <div className="control">
              <label htmlFor="vehicleRegisterDocument">
                Vehicle register document:
              </label>
              <input
                type="text"
                id="vehicleRegisterDocument"
                required
                onChange={handleVehicleRegisterDocumentChange}
                value={vehicleRegisterDocument}
              />
            </div>
            <div className="control">
              <label htmlFor="drivingExperience">Driving experience:</label>
              <input
                type="number"
                id="drivingExperience"
                required
                onChange={handleDrivingExperienceChange}
                value={drivingExperience}
              />
            </div>
            {errorDrExp && <p className="error">{errorDrExp}</p>}
            {discountMessage && <p className="info">{discountMessage}</p>}
            <Button type="submit" onClick={handleSubmit} disabled={disable}>
              Calculate
            </Button>
          </form>
        </section>
      ) : (
        <>
          <div className={styles.carInsurancePriceContainer}>
            <p>
              Your calculated price is {price} lv. If the price seems reasonable
              to you, click here to buy the insurance:
            </p>
            <Button
              className={styles.buyInsuranceButton}
              onClick={handleBuyInsurance}
            >
              Buy insurance
            </Button>
            {discountMessage && (
              <p>
                You have received a discount of 10% because you have a driving
                experience at least 10 years.
              </p>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default CarInsuranceQuote;
