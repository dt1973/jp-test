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
          xhr.setRequestHeader("If-Modified-Since", globalVar.lastModifiedDate);
        }
      },
      success: function(html, textStatus, xhr){
        if(globalVar.firstRequest) {
          globalVar.currentDate = xhr.getResponseHeader('Date');
          globalVar.lastModifiedDate = xhr.getResponseHeader('Last-Modified');

          console.log(globalVar.currentDate);
          console.log(globalVar.lastModifiedDate);

          // Start again

          $.topicPoller.poll();

          globalVar.firstRequest = false;

          console.log('First');
        } else {
          console.log('Subsequent');

          // if(???) {
          //   console.log('We have change! Proceeding to fetch the actual content...');
          //   $.topicPoller.addTopics();
          // }
        }
      },
      error: function(xhr, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
      }
    });
  },
  addTopics: function(topics) {
    console.log('Ran `addTopics`');

    var dataUrl = $('#topics').data('url');

    $.get(dataUrl, function(data) {
      var topics = $("#topics");

      topics.html(data);

      $("data").appendTo(topics).hide();
      $('#show_topics').show();

      console.log('New topics were added');
    });

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
