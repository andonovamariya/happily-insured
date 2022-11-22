const FIREBASE_DOMAIN =
  "https://happily-insured-default-rtdb.europe-west1.firebasedatabase.app";

export const getAllUsers = async () => {
  const response = await fetch(`${FIREBASE_DOMAIN}/user.json`);
  const responseUsersData = await response.json();
  if (!response.ok) {
    throw new Error(responseUsersData.message || "Could not fetch all users.");
  }

  const loadedUsers = [];

  for (const key in responseUsersData) {
    const insuranceObject = {
      id: key,
      ...responseUsersData[key],
    };
    loadedUsers.push(insuranceObject);
  }
  return loadedUsers;
};

