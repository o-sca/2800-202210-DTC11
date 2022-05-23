async function openRecents() {
    let savedStations;
    const userObject = await getUserStatus();
    if (userObject.isLoggedIn) savedStations = await fetchSavedStations(userObject.userID);
    else savedStations = false;

    console.log(savedStations)
};