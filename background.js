chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
  if (tab.url.indexOf("secure.saashr.com") > -1 && changeInfo.url === undefined){
  	console.log("reloaded")
  	console.log(tabId)
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
  	)  }
});