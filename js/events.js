(function($){

// temp Variables
var pageToken = "CAAKmOjQT6EUBALzUZB2ircZAZCUkNll4jeR36mmvCtQps2MZCaWiEothn3bcJOtyVGK2QF2fCDOPPefFyryFdewsPEqliYUjPln2HnKvxY4ELo5xIFqEZCqCHlM9YTAX43BsdEnFOM2mmysEjL9hBjQjBLAwtbog4yhO3hDlCEezDp5ZCxPQag770NE89Mm1wZD";
var fields = "&fields=picture.type(large),id,name,location,description";

window.fbAsyncInit = function() {
    // init the FB JS SDK
    FB.init({
        appId: '745718865455173', // App ID from the app dashboard
        channelUrl: 'http://abaumer.github.io', // Channel file for x-domain comms
        status: false, // Check Facebook Login status
        xfbml: false // Look for social plugins on the page
    });

    FB.api('/825568655/accounts?access_token='+pageToken, function(response) {
        if (response) {
            console.log("received account info");
            console.log(response);

            for (var i = 0; i < response.data.length; i++) {
                var fbe = response.data[i];

                // Get info for CFC 242 Page Only
                if (fbe.id === "330410753730567") {
                    var newToken = fbe.access_token;

                    FB.api('/330410753730567/events?access_token=' + newToken + fields, function(response2) {
                        if (response2) {
                            var entry;
                            console.log("got a response2");
                            console.log(response2);

                            for (var i = 0; i < response2.data.length; i++) {
                                var fbe = response2.data[i],
                                    date = moment(fbe.start_time).format("dddd, MMMM Do YYYY"),
                                    time = moment(fbe.start_time).format("h:mm:ss a");

                                entry = "<h2>" + fbe.name + "</h2>" +
                                    "<img src='" + fbe.picture.data.url + "' />" +
                                    "<p><b>" + date + "</b> - " + fbe.location + "</p>" +
                                    "<a href='https://www.facebook.com/events/" + fbe.id + "' title='View " + fbe.name + "' target='_blank'>View " + fbe.name + " on Facebook</a>" +
                                    "<p>" + fbe.description + "</p><hr/>";

                                entry2 = "<div class='media'>"+
                                              "<a class='pull-left' href='https://www.facebook.com/events/" + fbe.id + "' title='View " + fbe.name + "' target='_blank'>"+
                                                "<img class='media-object' src='" + fbe.picture.data.url + "' alt='" + fbe.name + "'>"+
                                              "</a>"+
                                              "<div class='media-body'>"+
                                                "<h2 class='media-heading'>" + fbe.name + "</h2>"+
                                                "<h3 class='lead'>" + date + "</h3>"+
                                                "<p>" + fbe.description + "<br/><a href='https://www.facebook.com/events/" + fbe.id + "' title='View " + fbe.name + "' target='_blank'><span class='.glyphicon .glyphicon-hand-right'></span> View " + fbe.name + " on Facebook</a></p>"+
                                              "</div>"+
                                            "</div><hr/>";

                                $("#fb-events").append(entry2);
                            };
                        } else {
                            console.log("unable to retrieve event information");
                        }
                    });
                }
            }
        } else {
            console.log("No FB Link");
        }
    });
};

// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/all.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

})(jQuery);