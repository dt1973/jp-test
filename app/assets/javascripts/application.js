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
    $.get($('#topics').data('url'), {
      after: $('.topic').last()
    });
  },
  addTopics: function(topics) {
    console.log('Ran `addTopics`');
    if($('#topics').length) {
      $('.topic').append($('#topics').hide());
      $('#show_topics').show();
    }
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