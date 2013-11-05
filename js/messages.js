(function($){

	function getVideos(success, error){
	    var url = "http://vimeo.com/api/v2/channel/611476/videos.json";

	    $.ajax({
	        url: url,
	        dataType: 'jsonp',
	        success: success,
	        error: error,
	        timeout: 10000
	    });
	}
	
	getVideos(function(data) {
		var videoContent;
	    for (var i=0; i < data.length; i++) {
	    	videoContent = "<div class='col-sm-6'>"+
					            "<article>"+
					              "<a href='"+data[i].mobile_url+"' target='_blank' title='watch "+data[i].title+"'>"+
					              	"<img src='"+data[i].thumbnail_large+"'/>"+
					                "<h1>"+data[i].title+"</h1>"+
					                "<p><i>"+data[i].upload_date+"</i></p>"+
					              "</a>"+
					            "</article>"+
					            "<br/>"+
					          "</div>";

	    	$("#msg-videos").append(videoContent);
	    };
	}, function(jqXHR) { // error callback
	    $("#msg-videos").append("<a href='https://vimeo.com/channels/611476' title='watch 242 videos on Vimeo'>Watch 242 Videos on Vimeo</a>");
	    console.log("couldn't get the Vimeo Videos for 242 Channel.  error: " + jqXHR); // CHANGE! AUSTIN!
	});

})(jQuery);