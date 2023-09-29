// chrome.runtime.onInstalled.addListener(() => {
//     chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//       // console.log("Extension Loaded!!!!");
//       console.log("Url: " + changeInfo.url);
//       if (changeInfo.url && changeInfo.url.includes("youtube.com")) {
        
//         console.log("Blocking Shorts");

//         shorts = document.getElementsByTagName("ytd-reel-shelf-renderer")
//         for (i = 0; i < shorts.length; i++){
//             shorts[i].style.display = "none"
//         }

//       }
//     });
//   });


chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        return;
      }
      if (tab && tab.url) {
        console.log("Current URL:", tab.url);
      }
    });
  });
});
