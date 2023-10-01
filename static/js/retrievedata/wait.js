bottun = document.getElementById('wait');
wrap = document.getElementById('side');
const newNode = document.createElement("span");
const textNode = document.createTextNode("Please wait! This might take a while");
newNode.appendChild(textNode);
newNode.setAttribute("class", "wait_message");

bottun.addEventListener("click", function() {
    wrap.insertBefore(newNode, wrap.children[-1]);
});


