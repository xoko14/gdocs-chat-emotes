var url = chrome.runtime.getURL("db/emotelist.json")

var emotelist

fetch(url).then(data => {
    data.json().then(json => {
        emotelist = json
        console.log(emotelist)
    })
})

const targetNode = document;
const observerOptions = {
    childList: true,
    attributes: false,
    subtree: true
}

const observer = new MutationObserver(callback);
observer.observe(targetNode, observerOptions);

function callback(mutationList, observer) {
    mutationList.forEach((mutation) => {
        if (mutation.addedNodes.length) {
            mutation.addedNodes.forEach(element => {
                if (element.className == "docs-chat-message") {
                    var text = element.innerHTML

                    emotelist.forEach(emote =>{
                        text = text.replaceAll(emote.name, `<img src=\"${emote.url}\" alt=\"${emote.name}\"/>`)

                        text = text.replaceAll(new RegExp("ffz:(\\w*)", "g"), "<img src=\"https://cdn.frankerfacez.com/emote/$1/1\"/>")
                    })

                    text = text.replaceAll()
                    element.innerHTML = text
                }
            });
        }
    });
}

console.log("finished loading")