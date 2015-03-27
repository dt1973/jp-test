//= require jquery
//= require jquery_ujs
//= require forem
//= require_tree .

var globalVar = {};

globalVar.firstRequest = true;
globalVar.lastModifiedDate;

$.topicPoller = {
  poll: function() {
    console.log('Ran `poll`');

    // `setInterval` is evil, refrain from using

    setTimeout(this.request, 5000);

//setInterval(this.request, 5000);
  },
  request: function() {
    console.log('Ran `request`');

    var dataUrl = $('#topics').data('url');

    console.log(dataUrl);

    // http://stackoverflow.com/questions/26071825/conditional-caching-in-jquery-if-modified-since-returns-304-response-but-doesn

    $.ajax({
      url: dataUrl,
      type:"GET",
      cache: true,
      ifModified: true,
      Async: true,
      beforeSend: function(xhr){
        if(!globalVar.firstRequest) {

          // Set date for `ifModified` above

          xhr.setRequestHeader("If-Modified-Since", globalVar.lastModifiedDate);
        }
      },
      success: function(html, textStatus, xhr){
        if(globalVar.firstRequest) {
          globalVar.lastModifiedDate = xhr.getResponseHeader('Last-Modified');

          // Start again

          $.topicPoller.poll();

          globalVar.firstRequest = false;

          console.log('First');
        } else {
          console.log('Subsequent');


          if(textStatus != "notmodified") {
            console.log('We have change!');

            // Add topics with the HTML we've received

            $.topicPoller.addTopics(html);
          } else {
            console.log("Server says not modified");

            // Start again

            $.topicPoller.poll();
          }
        }
      },
      error: function(xhr, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
      }
    });
  },
  addTopics: function(html) {
    console.log('Ran `addTopics`');

    var existingTopics = $.map($('.topic'), function(elm) { 
      return elm.id; 
    });

    var newTopic = $(html).find('.topic').not('#' + existingTopics.join(', #'));

    newTopic.prependTo($('.topics tbody')).hide();

    $('#show_topics').show();

    console.log('New topics were added');

    // Start again

    this.poll();
  },
  showTopics: function(e) {
    console.log('Ran `showTopics`');

    e.preventDefault();

    $('.topic').show();
    $('#show_topics').hide();
  }
};

$(function() {
  if($('#topics').length) {
    console.log('Ran `poll`');

    $.topicPoller.poll();

    $('#show_topics a').click($.topicPoller.showTopics);
  }
});
