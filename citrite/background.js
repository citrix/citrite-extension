
function navigate(url) {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.update(tab.id, {url: url});
  });
};

function show_notification(message) {
    var notification = new Notification(message, { icon: 'icon48.png', tag: 'citrix' });
    notification.onshow = function() { setTimeout(notification.close, 6000); }
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

//show_notification("xxx");
//chrome.runtime.onInstalled.addListener(function(details) { if (details.reason == "update") { chrome.windows.create({url: "popup.html", type: "popup"}); } });

/*
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if(changeInfo.status == "loading") {

        if(/google\.(com|co\.uk).+search\?q.(CF|CA|CP|CR|JC|EA|EXT|PR|PGM|SOM|TC|TR|WP|XRT|IT|XOP)\-\d+/.test(tab.url)) {
            var ticket =  /\w+\-\d+/.exec(tab.url);
            navigate("https://jira.uk.xensource.com/QuickSearch.jspa?searchString=" + ticket[0]);
        }
        else if(/google\.(com|co\.uk).+search\?q.(ACER|AFRL|AMD|AMZ|AT|AVTM|BCH|BET|BIT|BR|BRO|CANL|CAR|CC|CER|CHE|CIS|CRD|CSC|CXD|CYB|DELL|DOC|EGEN|EMC|EMX|ER|FE|FUJ|GEMT|HCL|HDX|HFX|HIDG|HIT|HP|HUA|IBM|INTC|INTX|ISV|JAXC|LSI|LSIN|MAR|MLX|MS|
MTHA|MTIT|NCSC|NEC|NETAPP|NIC|NICS|NTGR|NVHP|NVIDIA|NXS|ORCL|OSX|PC|QL|RAX|SCTX|SCTXI|SF|SLS|SRVT|SS|STAR|STRA|SYN|TESCO|TST|UGIS|VRTA|XCAMD|XCEHP|XCEN|XCHP|XCSUP|XCT|XCWGP|XDELL|XHP|XSB|XWS|ZLIT|ZZ)\-\d+/.test(tab.url)) {
            var ticket =  /\w+\-\d+/.exec(tab.url);
            navigate("https://tracker.vmd.citrix.com/QuickSearch.jspa?searchString=" + ticket[0]);
        }
    }
});
*/

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
