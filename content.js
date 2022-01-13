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
        //console.log(mutation.type)
        if (mutation.addedNodes.length) {
            mutation.addedNodes.forEach(element => {
                //console.log(element.classList)
                if (element.className == "docs-chat-message") {
                    var text = element.innerHTML

                    //(?<=ffz:)\w*
                    emotelist.forEach(emote =>{
                        text = text.replaceAll(emote.name, `<img src=\"${emote.url}\" alt=\"${emote.name}\"/>`)
                        console.log(emote)
                    })
                    //console.log(text)
                    element.innerHTML = text

                    //<img src=\"https://cdn.betterttv.net/emote/56e9f494fff3cc5c35e5287e/1x\"/>
                }
            });
        }
    });
}

console.log("finished loading");