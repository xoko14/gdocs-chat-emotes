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
        console.log(mutation.type)
        if (mutation.addedNodes.length) {
            mutation.addedNodes.forEach(element => {
                //console.log(element.classList)
                if (element.className == "docs-chat-message") {
                    var text = element.innerHTML
                    text = text.replace("monkaS", "<img src=\"https://cdn.betterttv.net/emote/56e9f494fff3cc5c35e5287e/1x\"/>")
                    //console.log(text)
                    element.innerHTML = text

                    //<img src=\"https://cdn.betterttv.net/emote/56e9f494fff3cc5c35e5287e/1x\"/>
                }
            });
        }
    });
}

console.log("finished loading");