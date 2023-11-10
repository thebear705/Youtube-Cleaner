/* dark and light mode */
document.addEventListener('DOMContentLoaded', function () {
    // Theme switch element
    const themeSwitch = document.getElementById('themeSwitch');

    // Load the user's theme preference from storage
    chrome.storage.sync.get(['themePreference'], function (result) {
        const userThemePreference = result.themePreference;

        // Set the initial value of the theme switch based on the user's preference or default to auto
        themeSwitch.value = userThemePreference || 'auto';

        // Apply the user's theme preference
        applyTheme(userThemePreference);
    });

    // Add an event listener for the theme switch
    themeSwitch.addEventListener('change', function () {
        const selectedTheme = themeSwitch.value;

        // Save the user's theme preference to storage
        chrome.storage.sync.set({ 'themePreference': selectedTheme });

        // Apply the selected theme
        applyTheme(selectedTheme);
    });

    // Add a listener for changes in the system's preferred color scheme
    window.matchMedia('(prefers-color-scheme: dark)').addListener(function (event) {
        const selectedTheme = themeSwitch.value;

        // Update the theme based on the system's color scheme
        if (selectedTheme === 'auto') {
            applyTheme(event.matches ? 'dark' : 'light');
        }
    });

    // Function to apply the theme
    function applyTheme(selectedTheme) {
        const themeSwitchContainer = document.getElementById('themeSwitch');

        if (selectedTheme === 'auto') {
            // Use media query to detect the system's preferred color scheme
            const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            document.body.classList.toggle('dark-mode', prefersDarkMode);
            document.body.classList.toggle('light-mode', !prefersDarkMode);

            themeSwitchContainer.classList.toggle('dark-mode', prefersDarkMode);
            themeSwitchContainer.classList.toggle('light-mode', !prefersDarkMode);


        } else {
            document.body.classList.remove('dark-mode', 'light-mode');
            document.body.classList.toggle('dark-mode', selectedTheme === 'dark');
            document.body.classList.toggle('light-mode', selectedTheme === 'light');

            themeSwitchContainer.classList.remove('dark-mode', 'light-mode');
            themeSwitchContainer.classList.toggle('dark-mode', selectedTheme === 'dark');
            themeSwitchContainer.classList.toggle('light-mode', selectedTheme === 'light');
            
        }
    }
});







/* Hide Shorts Toggle */
document.addEventListener('DOMContentLoaded', function() {
    var toggleSwitch = document.getElementById('toggleSwitch');

    // Load the toggle state from storage and update the UI
    chrome.storage.sync.get(['toggleState'], function(result) {
        toggleSwitch.checked = result.toggleState || false;
        updateToggleLabel();
    });

    // Add an event listener to the toggle switch
    toggleSwitch.addEventListener('change', function() {
        // Save the toggle state to storage
        chrome.storage.sync.set({ 'toggleState': toggleSwitch.checked });
        updateToggleLabel();
        // Perform any action based on the toggle state
        if (toggleSwitch.checked) {
            // Toggle is ON
            console.log('Feature is ON');
      
        } else {
            // Toggle is OFF
            console.log('Feature is OFF');

        }
    });

    // Update the label based on the toggle state
    function updateToggleLabel() {
        var toggleLabel = document.getElementById('toggleLabel');
        toggleLabel.textContent = toggleSwitch.checked ? 'Shorts are Hidden' : 'Shorts are Shown';
    }
});

function getAppversion() {
    return chrome.runtime.getManifest().version
}

// Set Version Number in Popup
// document.getElementById('extension-version').textContent = getAppversion();