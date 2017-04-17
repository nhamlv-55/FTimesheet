// Saves options to chrome.storage
// The following clear function is for debugging only
//chrome.storage.sync.clear()
piece_size = 2048
no_piece = 50
function save_options() {
  wordsets = []
  for(var i=0; i< counter; i++){
    name = document.getElementById("name-"+i).value
    wordset = document.getElementById("wordset-"+i).value
    wordset = wordset.replace(/\n/g, " ")
    wordset = wordset.replace(/","/g, " ")
    entry = {"name": name, "wordset": wordset}
    wordsets.push(entry)
  }
  // chopping data to smaller pieces to satisfy Chrome's storage policy
  wordsets = JSON.stringify(wordsets)
  len = wordsets.length

  for(var i =0; i< no_piece; i++){
    if(i*piece_size>=len){
      piece = ""
    }
    if(i*piece_size + piece_size >len){
      piece = wordsets.slice(i*piece_size, len)
    }
    piece = wordsets.slice(i*piece_size, i*piece_size+ piece_size)
    var data = {}
    data[i] = piece
    chrome.storage.sync.set(data)
  }
  var status = document.getElementById('status');
  status.textContent = 'Options saved.';
  setTimeout(function() {
      status.textContent = '';
    }, 750);
  
}


function restore_options() {
  chrome.storage.sync.get(
	  null
  , function(items) {
    if(Object.keys(items).length === 0 && items.constructor === Object){
      counter = 0;
    }else{
      data_string = ""
      for(var i = 0; i<no_piece; i++){
        data_string = data_string + items[i]
      }
      wordsets = JSON.parse(data_string)
      counter = wordsets.length
      for(var i=0; i< counter; i++){
        var div = document.createElement('div')
        var name = document.createElement("input")
        name.setAttribute("id", "name-"+i)
        name.setAttribute("style", "width: 100px; vertical-align: top;")
        name.setAttribute("value", wordsets[i]["name"])
        
        var wordset = document.createElement("textarea")
        wordset.setAttribute("id", "wordset-"+i)
        wordset.setAttribute("cols", "80")
        wordset.setAttribute("style", "margin-left: 4px;")
        wordset.setAttribute("rows", "15")
        wordset.textContent = wordsets[i]["wordset"]

        div.setAttribute("id", "0")
        div.appendChild(name)
        div.appendChild(wordset)
        var content = document.getElementById('content')
        content.appendChild(div);
      }
    }
  })
};

function add(){
	var div = document.createElement('div')
	var name = document.createElement("input")
	name.setAttribute("id", "name-"+counter)
	name.setAttribute("style", "width: 100px; vertical-align: top;")
	name.setAttribute("value", "Name")
	
	var wordset = document.createElement("textarea")
	wordset.setAttribute("id", "wordset-"+counter)
	wordset.setAttribute("cols", "80")
  wordset.setAttribute("style", "margin-left: 4px;")
	wordset.setAttribute("rows", "15")
	wordset.textContent = "Words...."

	div.setAttribute("id", "0")
	div.appendChild(name)
	div.appendChild(wordset)
	var content = document.getElementById('content')
	content.appendChild(div);
  counter = counter+1
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
document.getElementById('add').addEventListener('click',
    add);
