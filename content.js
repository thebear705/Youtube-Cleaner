// Function to be executed when the DOM content changes
function handleDomChange(mutationsList, observer) {
    console.log("YouTube Body Chnaged")
    toggleShorts();

}

function toggleShorts(){
    chrome.storage.sync.get(['toggleState']).then((result) => {
        if (result.toggleState)
            hideShorts();
        else
            showShorts();
    });
}

function hideShorts() {

    // Shorts on home page
    shorts = document.getElementsByClassName("style-scope ytd-rich-shelf-renderer");
    if (shorts) {
        for (i = 0; i < shorts.length; i++) {
            if (shorts[i].textContent.includes("Shorts") && (shorts[i].id === "dismissible" || shorts[i].tagName === "ytd-reel-shelf-renderer")) {
                /** For Testing, Log the Content of the Shorts Element */
                // console.log(shorts[i].textContent);

                // Hide The shorts by setting display property to none
                if (shorts[i].style.display != "none") {
                    shorts[i].style.display = "none"
                    console.log("Shorts Removed From Homepage");
                    // break;
                }
            }
        }
    }

    shorts = document.getElementsByTagName("ytd-reel-shelf-renderer");
    if (shorts) {
        for (i = 0; i < shorts.length; i++) {
            if (shorts[i].style.display != "none") {
                shorts[i].style.display = "none";
                // shorts[i].remove()
                // window.alert("Shorts Removed From Up NExt");
                console.log("Shorts Removed From Up Next");
                // break;
            }
        }
    }

}

function showShorts() {

    // Shorts on home page
    shorts = document.getElementsByClassName("style-scope ytd-rich-shelf-renderer");
    if (shorts) {
        for (i = 0; i < shorts.length; i++) {
            if (shorts[i].textContent.includes("Shorts") && (shorts[i].id === "dismissible" || shorts[i].tagName === "ytd-reel-shelf-renderer")) {
                /** For Testing, Log the Content of the Shorts Element */
                // console.log(shorts[i].textContent);

                // Hide The shorts by setting display property to none
                if (shorts[i].style.display != "") {
                    shorts[i].style.display = ""
                    console.log("Shorts Removed From Homepage");
                    // break;
                }
            }
        }
    }

    shorts = document.getElementsByTagName("ytd-reel-shelf-renderer");
    if (shorts) {
        for (i = 0; i < shorts.length; i++) {
            if (shorts[i].style.display != "") {
                shorts[i].style.display = "";
                // shorts[i].remove()
                // window.alert("Shorts Removed From Up NExt");
                console.log("Shorts Removed From Up Next");
                // break;
            }
        }
    }

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function removePlayed() {



    /** Element that contains the queue */
    var queue_column = document.getElementsByTagName('ytd-playlist-panel-renderer')[1]
    /** String that shows number of items in the queue and which index is currently playing */
    queue_index = queue_column.getElementsByClassName('index-message-wrapper style-scope ytd-playlist-panel-renderer')[0].textContent
    /** Amount of videos to delete */
    var count = 0

    // Use a regular expression to extract the first number in the quee index
    var match = queue_index.match(/\d+/); // This will match one or more digits
    if (match) {
        var firstNumber = parseInt(match[0]); // Convert the matched string to an integer
        count = firstNumber - 1
        console.log("Removing " + count + " videos from playlist")
    } else {
        console.error("Could not get queue index");
        return;
    }

    /** Start Removing played items */
    for (var i = 0; i < count; i++) {
        /** The Actual Playlist */
        var playlist_items = queue_column.getElementsByClassName('playlist-items style-scope ytd-playlist-panel-renderer')[0]
        /** 3 Dots Button that shows options you can do to item  */
        var playlist_items_dropdown = playlist_items.getElementsByClassName('dropdown-trigger style-scope ytd-menu-renderer')

        // Click on drop down menu
        playlist_items_dropdown[i].click()
        await sleep(200);

        /** Menu that shows up after clicking 3 dots */
        var popup_menu = document.getElementsByTagName('ytd-menu-popup-renderer')[0].getElementsByTagName('tp-yt-paper-listbox')[0]
        /** Clickable Buttons in the popup menu*/
        var menu_items = popup_menu.getElementsByClassName('style-scope ytd-menu-popup-renderer')

        // Find and Click Remove From playlist Button
        for (var j = 0; j < menu_items.length; j++) {
            if (menu_items[j].textContent.includes('Remove from playlist')) {

                // // Create a MutationObserver to wait until playlist has changed to delete next video 
                // var observer = new MutationObserver(function (mutations) {
                //     mutations.forEach(function (mutation) {
                //         if (mutation.type === 'childList') {
                //             j++;
                //             // The element has changed, so print it
                //             console.log("Element has changed:", playlistItems);
                //         }
                //     });
                // });

                // // Start observing the element for changes
                // observer.observe(playlistItems, { childList: true, subtree: true });

                menu_items[j].click();

                await sleep(400);

                // observer.disconnect();

                break; // Stop the loop once the item is found and clicked
            }
        }
    }

}

function addRemovePlayedButton() {
    /** List of Actions that can affect the playlist, includes save, clear */
    var playlist_actions = document.getElementById('playlist-actions') // Get playlist Actions

    if (playlist_actions) {
        var centerActions = playlist_actions.querySelector('div#center-actions.style-scope.ytd-playlist-panel-renderer');

        if (!centerActions) {
            // Create the div element and set its attributes
            centerActions = document.createElement('div');
            centerActions.id = 'center-actions';
            centerActions.className = 'style-scope ytd-playlist-panel-renderer';

            // Set the text content
            centerActions.textContent = 'Clear All';

            // Append the newly created element to playlistActions
            playlist_actions.appendChild(centerActions);
            console.log('Remove All button Created')
        } else {
            // Set the text content if the element already exists
            console.log('Remove All button already exists')
            // centerActions.textContent = 'Clear All';
        }

        // Now you have the centerActions element with text content "Clear All"
        console.log(centerActions);
    } else {
        console.error("Element with id 'playlist-actions' not found.");
    }

}

chrome.storage.onChanged.addListener((changes, namespace) => {
    
    
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        // Log Storage changes for debug
        console.log(
            `Storage key "${key}" in namespace "${namespace}" changed.`,
            `Old value was "${oldValue}", new value is "${newValue}".`
        );

        // Handle Storage Value Changes
        switch (key) {
            case 'toggleState':
                toggleShorts();
                break;
        
            default:
                break;
        } 
    }



});

// Create a new MutationObserver with the callback function
const observer = new MutationObserver(handleDomChange);

// Define the configuration for the observer
const config = {
    childList: true, // Watch for changes in the child elements of the target
    subtree: true,   // Watch for changes in the entire subtree of the target
};

// Start observing the document with the specified configuration
youtubeBody = document.getElementsByTagName('ytd-app')[0]
observer.observe(youtubeBody, config);

// To disconnect the observer when you no longer need it (e.g., in cleanup)
// observer.disconnect();

