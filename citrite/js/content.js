
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting == "hello")
            sendResponse({farewell: "goodbye"});
    });

chrome.extension.sendMessage({type:'showPageAction'});

function clickable_links(replacements) {

    RegExp.quote = function(str) {
        return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    };

    for (var key in replacements) {
        //console.log("replace: ", key);

        var re = new RegExp(key,"gm");

        jQuery('body *').replaceText(re, replacements[key], false);
    }
    jQuery('body *').linkify();

}
