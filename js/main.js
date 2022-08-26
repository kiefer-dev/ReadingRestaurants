// Get the current date
let currentDate = new Date();

const month = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

// Assign the current day of the week
switch (currentDate.getDay()) {
    case 0:
        dayOfWeek = "Sunday";
        dayOfWeekClass = ".sun";
        break;
    case 1:
        dayOfWeek = "Monday";
        dayOfWeekClass = ".mon";
        break;
    case 2:
        dayOfWeek = "Tuesday";
        dayOfWeekClass = ".tue";
        break;
    case 3:
        dayOfWeek = "Wednesday";
        dayOfWeekClass = ".wed";
        break;
    case 4:
        dayOfWeek = "Thursday";
        dayOfWeekClass = ".thu";
        break;
    case 5:
        dayOfWeek = "Friday";
        dayOfWeekClass = ".fri";
        break;
    case 6:
        dayOfWeek = "Saturday";
        dayOfWeekClass = ".sat";
        break;
}

// Insert today's date at the top of the page
document.querySelector('#dateArea').innerText = `${dayOfWeek}, ${month[currentDate.getMonth()]} ${currentDate.getDate()}`;

// Get an array of each of the elements with the weekday class
const todays = document.querySelectorAll(dayOfWeekClass);
// Loop through the array of each weekday element and add the today class to it
todays.forEach(day => day.classList.add('today'));

// Get the current hour
// const currentHour = currentDate.getHours();
// // Get the current minutes converted to a decimal for comparison to half-hours
// const currentMinsDecimal = currentDate.getMinutes() / 60;
const currentTime = currentDate.getHours() + (currentDate.getMinutes() / 60);
// Get an array of each day's time tds
const hoursArray = document.querySelectorAll(".hours");
hoursArray.forEach(hours => {
    if (hours.innerText !== "—") { // if we're looking at a day that the restaurant is open
        // Get the opening and closing hour strings in an array
        let openingClosingStr = hours.innerText.split(" — ");
        // Map those to numbers, if it's a half-hour then add .5 for comparison to current mins
        let openingClosing = openingClosingStr.map(time => {
            if (time.length <= 3) { //if it's a whole hour
                if (time[time.length-1] === "a") { // AM
                    // if it's 12am return 24, else return the time
                    return time === "12a" ? 24 : +time.slice(0, time.indexOf("a"))
                } else { // PM
                    // if it's 12pm return 12, else return the time + 12
                    return time === "12p" ? 12 : +time.slice(0, time.indexOf("p")) + 12
                }
            } else { //if it's a half hour
                if (time[time.length-1] === "a") { // AM
                    // if it's 12:30am return 24.5, else return the time
                    return time === "12:30a" ? 24.5 : +time.slice(0, time.indexOf(":")) + .5
                } else { // PM
                    // if it's 12:30pm return 12.5, else return the time + 12
                    return time === "12:30p" ? 12.5 : +time.slice(0, time.indexOf(":")) + 12.5
                }
                // return +time.slice(0, time.indexOf(":")) + .5
            }
        })

        if (openingClosing[0] > currentTime || currentTime >= openingClosing[1]) {
            hours.parentNode.classList.add("closed");
        }

    }
})



// OPTIONS SECTION
// Logic for toggling options section
document.getElementById("optionsButton").addEventListener("click", showOptions)
function showOptions() {
    const buttonText = document.getElementById("optionsButton").innerText;
    if (buttonText === "Show Options") {
        document.getElementById("optionsButton").innerText = "Hide Options";
    } else {
        document.getElementById("optionsButton").innerText = "Show Options";
    }

    document.getElementById("options").classList.toggle("hidden");
}

// Logic for "Hide Closed" Checkbox
document.getElementById("hideButton").addEventListener("change", hideClosed);
function hideClosed() {
    todays.forEach(today => {
        if (today.parentNode.classList.contains("closed")) {
            today.parentNode.parentNode.parentNode.parentNode.classList.toggle("hidden");
        }
    })
}

// Logic for viewing specific restaurant
document.getElementById("restaurantSelectDropdown").addEventListener("change", viewSpecific)
function viewSpecific() {
    // Reset the restaurant style selection
    document.getElementById("styleSelectDropdown").selectedIndex = 0;
    // Save the current restaurant selection in the selection variable
    const selection = document.getElementById("restaurantSelectDropdown").value;
    // Retrieve each of the restaurant tiles and save them in the tiles variable
    const tiles = document.querySelectorAll("a");
    
    if (selection !== "all") {
        tiles.forEach(tile => {
            // clear the hidden class from all tiles to reset
            tile.classList.remove("hidden");
            // add the hidden class to all tiles except selected restaurant
            if (tile.id !== selection) {
                tile.classList.add("hidden");
            }
        })
    } else {
        tiles.forEach(tile => {
            // clear the hidden class from all tiles to reset
            tile.classList.remove("hidden");
        })
    }
}

// Logic for viewing specific styles of restaurant
document.getElementById("styleSelectDropdown").addEventListener("change", viewStyle)
function viewStyle() {
    // Reset the specific restaurant selection
    document.getElementById("restaurantSelectDropdown").selectedIndex = 0;
    // Save the current style selection in the selection variable
    const selection = document.getElementById("styleSelectDropdown").value;
    // Retrieve each of the restaurant tiles and save them in the tiles variable
    const tiles = document.querySelectorAll("a");
    
    if (selection !== "all") {
        tiles.forEach(tile => {
            // clear the hidden class from all tiles to reset
            tile.classList.remove("hidden");
            // add the hidden class to all tiles except selected restaurant
            if (!tile.classList.contains(selection)) {
                tile.classList.add("hidden");
            }
        })
    } else {
        tiles.forEach(tile => {
            // clear the hidden class from all tiles to reset
            tile.classList.remove("hidden");
        })
    }
}