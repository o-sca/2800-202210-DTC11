async function openRecents() {
    let savedStations;
    const userObject = await getUserStatus();
    if (!userObject.isLoggedIn) return $('.error-status').html(`Not Logged In`)
 
    savedStations = await fetchSavedStations(userObject.userID);
    recentStations = await fetchRecentStations(userObject.userID);

    $('.viewed-container').empty();
    $('.saved-container').empty();

    if (savedStations) {
        savedStations.forEach(station => {
            $('.saved-container').append(`
                <div class="recents-block">
                    <p>Station Name: ${station.stationName}</p>
                    <p>Station ID: ${station.stationID}</p>
                </div>
            `)
        })
    } else return;

    if (recentStations) {
        recentStations.forEach(station => {
            $('.viewed-container').append(`
                <div class="recents-block">
                    <p>Station Name: ${station.stationName}</p>
                    <p>Station ID: ${station.stationID}</p>
                </div>
            `)
        })
    } else return;
};