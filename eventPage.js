//chrome.webRequest.onBeforeSendHeaders.addListener(
//    function(details) {
//        console.log('request', details.type);
//        if (['sub_frame', 'main_frame'].indexOf(details.type) > -1){
//            console.log(details)
//        }
//    },
//    {urls: ["<all_urls>"]},
//    ["blocking", "requestHeaders"]);




chrome.webRequest.onHeadersReceived.addListener(
    function(details) {
        if (['sub_frame', 'main_frame'].indexOf(details.type) > -1){ //todo: throw this in the filter
            for (var i = 0; i < details.responseHeaders.length; ++i) {
                if (details.responseHeaders[i].name === 'Content-Type') {
                    console.log(details.responseHeaders[i].value);
                    if (details.responseHeaders[i].value.indexOf('text/html') == -1){
                        console.log('intercepted request:', details.responseHeaders[i].value, details);
                        return {redirectUrl: 'http://hexial.net/downloads'};
                        //todo: if type was sub_frame, pop up a download progress box.
                    }
                    break;
                }
            }
        }
    },
    {urls: ["<all_urls>"]},
    ["blocking", "responseHeaders"]
    );
ZfnkKIYlTcvKG8s