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

// Logic for "Hide Closed" Button
document.getElementById("hideButton").addEventListener("click", hideClosed);
function hideClosed() {
    const buttonText = document.getElementById("hideButton").innerText;
    if (buttonText === "Hide Closed Restaurants") {
        document.getElementById("hideButton").innerText = "Show All Restaurants";
    } else {
        document.getElementById("hideButton").innerText = "Hide Closed Restaurants";
    }

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