const searchField = document.querySelector(".search_area");
const temperatureField = document.querySelector(".temp p");
const place = document.querySelector('#place');
const date = document.querySelector("#time");
const conditionField = document.querySelector(".condition p")

function searchForLocation() {
    let target = searchField.value;  // Make sure to declare target with let/const
    fetchResults(target);
}

async function fetchResults(target) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=6617b2d0a2cb40289aa230149252202&q=${target}&aqi=no`;

    try {
        let response = await fetch(apiUrl);  // Fetch data from API
        if (!response.ok) throw new Error("Failed to fetch data"); // Handle fetch errors
        let data = await response.json();   // Convert response to JSON
        
        let locationName = data.location.name;
        let time = data.location.localtime; // Corrected data.location.location to data.location.localtime
        let temp = data.current.temp_c;
        let condition = data.current.condition.text;
        
        updateDetails(temp, locationName, time, condition);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function updateDetails(temp, location, time, condition) {
    const splitDate = time.split(' ')[0]; // Extract date
    const splitTime = time.split(' ')[1]; // Extract time
    const currentDay = getDayName(new Date(splitDate).getDay()); // Get day name

    temperatureField.innerText = temp;
    place.innerText = location;
    date.innerText = `${splitDate} ${currentDay} ${splitTime}`;
    conditionField.innerText = condition;
}

function getDayName(number) {
    switch (number) {
        case 0: return 'Sunday';
        case 1: return 'Monday';
        case 2: return 'Tuesday';
        case 3: return 'Wednesday';
        case 4: return 'Thursday';
        case 5: return 'Friday';
        case 6: return 'Saturday';
        default: return 'Invalid Day';
    }
}