$(document).ready(function() {

  let userId;

  $.get("/api/user_data").then(function(data) {
    userId = data.id;
    let msgId = $("#message-container-ID").data("id");
    $.get(`/api/messages/${msgId}`).then(function(data) {
      console.log(data);
      $("#message-time-ID").text(data.createdAt);
      $("#message-subject-ID").text(data.subject);
      $("#message-body-ID").text(data.body);
    });

  });



});