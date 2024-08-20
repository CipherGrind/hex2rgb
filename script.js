// What needs to be done to convert HEX to RGB
    // you first need to take the 6 digit hex value and split it into three parts
    // each part is 2 digits and represents RED, GREEN, BLUE
    // RRGGBB
    // 00 (equals 0 in decimal) to FF (equals 255 in decimal)
    // EXAMPLE:
        // #FFA07A
            // hex.slice(0, 2) returns FF
            // hex.slice(2, 4) returns A0
            // hex.slice(4, 6) returns 7A
        // you need to convert the 2 digit hex value (base 16) to decimal (base 10)
            // This is done using the parseInt function with a radix (base) of 16:
                // FF = 255 (red)
                // A0 = 160 (green)
                // 7A = 122 (blue)

    // STEP 1: create a function to take a hex value
        // A: slice it into 3 parts R, G, B, and return it. This is a conversion.
    // STEP 2: create a function to take the conversion value and set it as a new variable
        // A: give the input hex value a variable
        // B: validate the hex value that was inputted in the form
            // Make sure the hex value is using 0-9A-Fa-f and 6 digits
                // (!/^[0-9A-Fa-f]{6}$/.test(hex)
                    // ^ assets position at the begging of the string (outside brackets)
                    // starts the matching
                // $ assets position at the end of the string
                // .test(hex) tests the string and 
                    // if it matches the definition of the regular expression
                        // if not return a warning message
        // C: once the value of hexToRGB(hex) is validated, assign it a new variable
        // D: you can use the new variable to display it in the dom elements
        // E: gather the total sum of all 3 rgb values
        // F: you can use the rgb total sum to dynamically change the border color
    // STEP 3: add an event listener to the input field
        // A: remove non-hex characters
            // set a variable (hex) with = this.value.replace(/[^0-9A-Fa-f]/g, '')
                // ^ notation is a negated character class (inside brackets)
                    // that matches any character not included in the specified set
                // /g flag stands for global
                    // replacement will be applied to all matches in the string
                // '' replaces non-hex characters with an empty string, removes it
        // B: limit to 6 characters
        // C: use this.value to update the value of the hex variable
            // this.value = hex;
    // STEP 4: Show a pop up message
        // A: take a div element to push a message into and activate a css class
        // B: deactivate the css class to hide the message div
    // STEP 5: 
        // A: take the div element rgbColor value and assign it a variable
        // B: copy the variable to the clipboard and fire the message div


// STEP 1:
// Function to convert Hex to RGB
function hexToRGB(hex) {
    // A:
    // Parse the r, g, b values
    let r = parseInt(hex.slice(0, 2), 16);
    let g = parseInt(hex.slice(2, 4), 16);
    let b = parseInt(hex.slice(4, 6), 16);

    return `rgb(${r}, ${g}, ${b})`;
}

// STEP 2:
function convertToRGB() {
    // A:
    // Get the hex value from the input
    let hex = document.getElementById("hex").value;

    // B:
    // Validate the hex code
    if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
        showPopup("Please enter a valid hex color code.");
        return;
    }

    // C:
    // Convert to RGB
    let rgbColor = hexToRGB(hex);

    // D:
    // Display the RGB color on the screen
    document.getElementById("rgbColor").textContent = rgbColor;
    document.getElementById("colorPreview").style.backgroundColor = rgbColor;

    // E:
    // Calculate the total RGB value to decide on the border color
    let totalRGB = parseInt(hex.slice(0, 2), 16) + parseInt(hex.slice(2, 4), 16) + parseInt(hex.slice(4, 6), 16);

    // F:
    // Set the border color based on the total RGB value
    if (totalRGB >= 600) {
        document.getElementById("colorPreview").style.border = "5px double #000000"; // Black border
    } else {
        document.getElementById("colorPreview").style.border = "5px double #e1e1e1"; // Light gray border
    }
}

// STEP 3:
// Add an event listener to the input field to restrict input to 6 alphanumeric characters
document.getElementById("hex").addEventListener("input", function() {
    // A:
    let hex = this.value.replace(/[^0-9A-Fa-f]/g, ''); // Remove non-hex characters
    // B:
    if (hex.length > 6) {
        hex = hex.slice(0, 6); // Limit to 6 characters
    }
    // C:
    this.value = hex; // Update the input field value
});

// STEP 4:
function showPopup(message) {
    // A:
    let popup = document.getElementById("popup");
    popup.textContent = message;
    popup.classList.add("show");

    // B:
    setTimeout(() => {
        popup.classList.remove("show");
    }, 3000); // Popup will disappear after 3 seconds
}

// STEP 5:
// Function to copy RGB color to clipboard
function copyRGB() {
    // A:
    let rgbColor = document.getElementById("rgbColor").textContent;
    // B:
    navigator.clipboard.writeText(rgbColor).then(() => {
        showPopup("RGB color copied to clipboard!");
    }).catch(err => {
        showPopup("Failed to copy: " + err);
    });
}


