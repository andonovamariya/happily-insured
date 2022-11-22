import { useEffect, useState } from "react";
import { useParams } from "react-router";
import HighlightedInsurance from "../../components/Insurances/HighlightedInsurance";

const InsuranceDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [insurance, setInsurance] = useState(null);
  const params = useParams();
  const { insuranceId } = params;

  useEffect(() => {
    const getSingleInsurance = async (insuranceId) => {
      setIsLoading(true);
      const response = await fetch(
        `https://happily-insured-default-rtdb.europe-west1.firebasedatabase.app/insurances/${insuranceId}.json`
      );

      if (!response.ok) {
        response.message
          ? setError(response.message)
          : setError("Sorry, could not fetch insurance.");
        throw new Error(
          "Something went wrong with fetching the insurance data."
        );
      }

      const responseData = await response.json();
      const loadedInsurance = {
        id: insuranceId,
        ...responseData,
      };

      setInsurance(loadedInsurance);
      setIsLoading(false);
    };
    getSingleInsurance(insuranceId).catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, [insuranceId]);

  return (
    <>
      {isLoading && (
        <h3>
          <span className="loading">Loading insurances...</span>
        </h3>
      )}
      {error && (
        <h3>
          <span className="error">{error}</span>
        </h3>
      )}
      {!error && !isLoading && insurance && (
        <HighlightedInsurance loadedInsurance={insurance} />
      )}
    </>
  );
};

export default InsuranceDetails;
