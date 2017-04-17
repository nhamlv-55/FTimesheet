console.log("call ftimesheet")
//chrome.storage.local.clear()
chrome.storage.local.get({
    index: 0
  }, function(items){
    id = items.index
    console.log(id)
    l = getAllElementsWithAttribute("title", "Add Row")
    if(id<l.length){
      //fill out previous node
      if(id > 0){
        day = l[id-1].parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.firstChild.getElementsByClassName("dropdown_toggle")[0].title
        if(day.indexOf("Sun")== -1 && day.indexOf("Sat")== -1){
          from = l[id-1].parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.firstChild
          from.value = "1230"
          to = from.parentNode.parentNode.nextSibling.firstChild.firstChild
          to.value = "1715"
        }
      }
      // fill out current node
      day = l[id].parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.firstChild.getElementsByClassName("dropdown_toggle")[0].title
      if(day.indexOf("Sun")== -1 && day.indexOf("Sat")== -1){
        from = l[id].parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.firstChild
        from.value = "845"
        to = from.parentNode.parentNode.nextSibling.firstChild.firstChild
        to.value = "1200"
      }
      l[id].click()

      id++
      chrome.storage.local.set({
        index: id
      })
    }else{
      day = l[id-1].parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.firstChild.getElementsByClassName("dropdown_toggle")[0].title
      if(day.indexOf("Sun")== -1 && day.indexOf("Sat")== -1){
        from = l[id-1].parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.firstChild
        from.value = "1230"
        to = from.parentNode.parentNode.nextSibling.firstChild.firstChild
        to.value = "1715"
      }
    }
  })

function getAllElementsWithAttribute(attribute, value)
{
  var matchingElements = [];
  // seriously, f you kronos
  var allElements = document.getElementsByClassName("comboboxIcon");
  for (var i = 0, n = allElements.length; i < n; i++)
  {
    if (allElements[i].getAttribute(attribute) !== null && allElements[i].getAttribute(attribute) == value)
    {
      // Element exists with attribute. Add to array.
      // matchingElements.push(allElements[i].getAttribute("onClick").slice(8, 16));
      matchingElements.push(allElements[i]);

    }
  }
  return matchingElements;
}
