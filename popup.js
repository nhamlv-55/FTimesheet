piece_size = 2048
no_piece = 50

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    message.innerText = request.source;
  }
});

document.addEventListener('DOMContentLoaded', function() {

  var ftimesheet = document.getElementById('ftimesheet');
	    // onClick's logic below:
  ftimesheet.addEventListener('click', function() {
    var query = { active: true, currentWindow: true };
    function callback(tabs) {
      var currentTab = tabs[0]; // there will be only one in this array
      var tabId = currentTab.id; // also has properties like currentTab.id
      console.log(tabId)
      console.log("called f timesheet")
      chrome.webNavigation.getAllFrames({tabId: tabId}, 
        function(allFrames){
          for(var i =0; i< allFrames.length; i++){
            if(allFrames[i].url.indexOf("UiControl_TimeSheet")>-1){
              console.log(allFrames[i].frameId)
              chrome.tabs.executeScript(null, {file: 'ftimesheet.js', allFrames: true, frameId: allFrames[i].frameId});

            }
          }
          console.log(allFrames)
        }
      )
    }
    chrome.tabs.query(query, callback);
    
  });
  var options = document.getElementById('go-to-options');
  options.addEventListener('click', function(){
    var count = 0;
    chrome.storage.local.clear();
      var tick = setInterval(
        function () {
          document.getElementById("ftimesheet").click(); 
          count++; 
          if(count > 17){
            clearInterval(tick)
          }
        }, 2000);
  })
});
