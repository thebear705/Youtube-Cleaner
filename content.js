function removeShorts() {

    // Shorts on home page
    shorts = document.getElementsByClassName("style-scope ytd-rich-shelf-renderer");
    if (shorts) {
        for (i = 0; i < shorts.length; i++) {
            if (shorts[i].textContent.includes("Shorts") && (shorts[i].id === "dismissible" || shorts[i].tagName === "ytd-reel-shelf-renderer")) {
                console.log(shorts[i].textContent);
                shorts[i].remove()
                window.alert("Shorts Removed From Homepage");
                break;
                // shorts[i].style.display = "none"
            }
        }
    }


    shorts = document.getElementsByTagName("ytd-reel-shelf-renderer");
    if (shorts) {
        for (i = 0; i < shorts.length; i++) {
            shorts[i].style.display = "none";
            shorts[i].remove()
            window.alert("Shorts Removed From Up NExt");
            break;
        }
    }

}


// Function to be executed when the DOM content changes
function handleDomChange(mutationsList, observer) {
    // Your code to handle the DOM changes here
    removeShorts();
    console.log("DOM content changed!");
}

// Create a new MutationObserver with the callback function
const observer = new MutationObserver(handleDomChange);

// Define the configuration for the observer
const config = {
    childList: true, // Watch for changes in the child elements of the target
    subtree: true,   // Watch for changes in the entire subtree of the target
};

// Start observing the document with the specified configuration
observer.observe(document, config);

// To disconnect the observer when you no longer need it (e.g., in cleanup)
// observer.disconnect();

