async function openRecents() {
    let savedStations;
    const userObject = await getUserStatus();
    if (userObject.isLoggedIn) {
        savedStations = await fetchSavedStations(userObject.userID);
        recentStations = await fetchRecentStations(userObject.userID);
    }
    else {
        savedStations = false;
        recentStations = false
    }
    console.log(recentStations)
    console.log(savedStations)
};