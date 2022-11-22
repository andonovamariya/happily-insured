const FIREBASE_DOMAIN =
  "https://happily-insured-default-rtdb.europe-west1.firebasedatabase.app";

export const buyInsurance = async (insuranceData, customerId) => {
  const buyInsuranceResponse = await fetch(
    `${FIREBASE_DOMAIN}/user/${customerId}/insurances.json`,
    {
      method: "POST",
      body: JSON.stringify(insuranceData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const responseData = await buyInsuranceResponse.json();
  console.log(buyInsuranceResponse);
  if (!buyInsuranceResponse.ok) {
    throw new Error(
      responseData.message ||
        "Could not add the insurance to the user's account."
    );
  }
};

export const getUserInsurances = async (customerId) => {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/user/${customerId}/insurances.json`
  );
  const responseInsurancesData = await response.json();
  if (!response.ok) {
    throw new Error(
      responseInsurancesData.message ||
        "Could not fetch this user's insurances."
    );
  }

  const transformedInsurances = [];

  for (const key in responseInsurancesData) {
    const insuranceObject = {
      id: key,
      ...responseInsurancesData[key],
    };
    transformedInsurances.push(insuranceObject);
  }

  return transformedInsurances;
};
