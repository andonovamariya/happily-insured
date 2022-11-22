import { useState, useEffect } from "react";
import InsuranceItem from "./InsuranceItem";

import styles from "./Insurances.module.css";

const InsurancesList = () => {
  const [insurances, setInsurances] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchInsurances = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://happily-insured-default-rtdb.europe-west1.firebasedatabase.app/insurances.json"
      );

      if (!response.ok) {
        setHttpError(response.message);
        throw new Error(
          "Something went wrong with fetching the insurance data."
        );
      }

      const responseData = await response.json();
      const loadedInsurances = [];

      for (const key in responseData) {
        const insuranceObject = {
          id: key,
          ...responseData[key],
        };
        loadedInsurances.push(insuranceObject);
      }

      setInsurances(loadedInsurances);
      setIsLoading(false);
    };

    fetchInsurances().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  const insurancesList = insurances.map((insurance) => (
    <InsuranceItem
      key={insurance.id}
      id={insurance.id}
      title={insurance.title}
      img={insurance.img}
      description={insurance.description}
    />
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

      {!httpError && !isLoading && insurancesList.length > 0 && (
        <div className={styles.insurances}>
          <ul className={styles.insurancesList}>{insurancesList}</ul>
        </div>
      )}
    </>
  );
};

export default InsurancesList;
