chrome.webNavigation.onCompleted.addListener(function() {
    console.log("cositas");
    while (true) {
        var elements = document.getElementsByTagName('*');

        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];

            if (element.className == "docs-chat-message-body") {
                var text = element.textContent
                text.replace("monkaS", "<img src=\"https://cdn.betterttv.net/emote/56e9f494fff3cc5c35e5287e/1x\"/>")
                element.textContent = text
            }
        }
    }
}, {url: [{urlMatches : 'https://docs.google.com/*'}]});