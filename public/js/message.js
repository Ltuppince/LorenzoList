$(document).ready(function() {

  let userId;

  $.get("/api/user_data").then(function(data) {
    userId = data.id;


  });



});