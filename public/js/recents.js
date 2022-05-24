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

    // [
    //     { userID: 74, stationID: 249385 },
    //     { userID: 74, stationID: 2802 },
    //     { userID: 74, stationID: 315726 },
    //     { userID: 74, stationID: 230717 },
    //     { userID: 74, stationID: 68322 }
    // ]
    // [
    //     {
    //       userID: 74,
    //       stationID: 161024,
    //       stationName: 'E 44th Ave Parking/Charging'
    //     },
    //     {
    //       userID: 74,
    //       stationID: 2802,
    //       stationName: 'E 53rd Ave Parking Lot'
    //     },
    //     {
    //       userID: 74,
    //       stationID: 249385,
    //       stationName: 'Springs At Langara (Coming Soon)'
    //     }
    // ]
};