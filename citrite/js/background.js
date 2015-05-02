/*
chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: { hostSuffix: 'citrite.net'}
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: { hostSuffix: 'citrix.com'}
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: { hostSuffix: 'podio.com'}
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: { hostSuffix: 'slack.com'}
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: { hostSuffix: 'xenserver.org'}
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: { hostSuffix: 'xensource.com'}
                }),
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});
*/
//console.log("bla bla");

function navigate(url) {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.update(tab.id, {url: url});
  });
}

function show_notification(message) {
    var notification = new Notification(message, { icon: 'icon48.png', tag: 'citrix' });
    notification.onshow = function() { setTimeout(notification.close, 3000); }
}

// Check whether new version is installed
chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        show_notification("Thanks for installing our Citrix extension! #DevOps");
    }else if(details.reason == "update"){
        var thisVersion = chrome.runtime.getManifest().version;
        if (thisVersion != details.previousVersion) {
        show_notification("Updated from " + details.previousVersion + " to " + thisVersion + "! #DevOps");
        }
    }
});


jQuery.getJSON("https://do.citrite.net/extension.json?", function(data) {
    var replacements = data;

    console.log("Loaded JSON config from DevOps server.");

    chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
        if (request && request.type === 'showPageAction') {
            //console.log("XXXX " + replacements);
            var tab = sender.tab;

            function callback(tab) {
                if (chrome.runtime.lastError) {
                    //console.log(chrome.runtime.lastError.message);
                } else {
                    console.log("citrite activate! " + data);
                    chrome.pageAction.show(tab.id);
                    chrome.pageAction.setTitle({
                        tabId: tab.id,
                        title: 'url=' + tab.url
                    });
                    var mycode = "console.log('xxx'); var data = " + JSON.stringify(data) + "; clickable_links(data);"; // var x = JSON.parse(data)
                    chrome.tabs.executeScript(tab.id, {code: mycode});
                    console.log("zuzu");
                }
            }
            chrome.tabs.get(tab.id, callback);

        }
    });

});


/*
chrome.omnibox.onInputChanged.addListener(
    function(text, suggest) 
    {
     chrome.extension.getBackgroundPage().console.log("on: "  + text);
     url = "http://engsearch.citrite.net/suggest?q=" + encodeURIComponent(text) + "&output=xml_no_dtd&proxystylesheet=firststop&sort=date%3AD%3AL%3Ad1&wc=200&wc_mc=1&oe=UTF-8&ie=UTF-8&ud=1&exclude_apps=1&site=default_collection&format=os";	
     var my_suggest = suggest;
     $.getJSON(url, function(data) {
         var suggestions = []
         for (index = 0; index < data[1].length; index++) {
             s = data[1][index];
             desc = "<dim><match>" + s + "</match> from engsearch</dim>";
             suggestions.push({content:s, description: desc});
             }
        if(suggestions.length>0) {
        
           chrome.omnibox.setDefaultSuggestion({description:suggestions[0].description});
           // Remove the first suggestion from the array since we just suggested it
           suggestions.shift();
           
           // Suggest the remaining suggestions
           my_suggest(suggestions);
        }
	});
    }
);

// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
  function(text) {
        console.log('inputEntered: ' + text);
        url = "http://engsearch.citrite.net/search?q=" + encodeURIComponent(text) + "&btnG=Search&client=firststop&output=xml_no_dtd&proxystylesheet=firststop&sort=date%3AD%3AL%3Ad1&wc=200&wc_mc=1&oe=UTF-8&ie=UTF-8&ud=1&exclude_apps=1&site=default_collection";	
        navigate(url);
  }
);
*/


