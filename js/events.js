(function($){

// temp Variables
var pageToken = "CAACEdEose0cBANZBtVpSsfN3D7GluZCTzgVUZANkdGcTGg6rocQldlcFYUzUnes6dDgzaK0t5ePKxrFmSWuvFpjfEYeMLrXu7yWjXZBP96Gag2cd2jGhj8glhbrpn3a9GSthK1SjjyJy3Fv3pQpVE3u79G0YFQb1zl1Xlj6f71YWFNK1jdn02F8Txslkwn4ZD";
var fields = "&fields=picture.type(large),id,name,location,description";

window.fbAsyncInit = function() {
    // init the FB JS SDK
    FB.init({
        appId: '508714812559221', // App ID from the app dashboard
        channelUrl: 'http://api.jmps.in/test/fb/index.html', // Channel file for x-domain comms
        status: true, // Check Facebook Login status
        xfbml: true // Look for social plugins on the page
    });

    FB.api('/825568655/accounts?access_token='+pageToken, function(response) {
        if (response) {
            console.log("received account info");
            console.log(response);

            for (var i = 0; i < response.data.length; i++) {
                var fbe = response.data[i];

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

                                entry2 = "<div class='media'>
                                              <a class='pull-left' href='https://www.facebook.com/events/" + fbe.id + "' title='View " + fbe.name + "' target='_blank'>
                                                <img class='media-object' src='" + fbe.picture.data.url + "' alt='" + fbe.name + "'>
                                              </a>
                                              <div class='media-body'>
                                                <h4 class='media-heading'>" + fbe.name + "</h4>
                                                <p>" + fbe.description + " - <a href='https://www.facebook.com/events/" + fbe.id + "' title='View " + fbe.name + "' target='_blank'>View " + fbe.name + " on Facebook</a></p>
                                              </div>
                                            </div>";

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