var url = chrome.runtime.getURL("db/emotelist.json")

var emotelist

fetch(url).then(data => {
    data.json().then(json => {
        emotelist = json
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
                    var bubble = element.getElementsByClassName("docs-chat-message-bubble")[0]
                    var text = bubble.innerHTML

                    // FrankerFaceZ emotes
                    text = text.replaceAll(new RegExp("ffz:(\\w*)", "g"), "<img src=\"https://cdn.frankerfacez.com/emote/$1/1\"/>")

                    // FrankerFaceZ search
                    text = text.replaceAll(new RegExp("ffzs:(\\w*)", "g"), "<img src=\"https://EmoteAPI.xoko14.repl.co/ffz/emote/$1\"/>")

                    // any image
                    text = text.replaceAll(new RegExp("img:{(.*?)}", "g"), (match, selection) => {
                        var url = selection.match(new RegExp("(?<=<a rel=\"nofollow\" target=\"_blank\" href=\").*(?=\")", "g"))
                        return `<img src=\"${url}\" style=\"width: 100%;\"/>`
                    })

                    //json emotes
                    emotelist.forEach(emote =>{
                        text = text.replaceAll(emote.name, `<img src=\"${emote.url}\" alt=\"${emote.name}\"/>`)
                    })

                    bubble.innerHTML = text
                }
            });
        }
    });
}

console.log("Loaded Better Drive Chat extension.")