// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require forem
//= require_tree .

$.topicPoller = {
  poll: function() {
    console.log('Ran `poll`');
    setTimeout(this.request, 5000);
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
      beforeSend: function (xhr){ 
        xhr.setRequestHeader("If-Modified-Since", xhr.getResponseHeader('Last-Modified'));
      },
      success: function(data){
        console.log('We have change!');
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
