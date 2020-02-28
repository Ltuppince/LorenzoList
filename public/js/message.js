$(document).ready(function() {

  const form = document.getElementById('reply-message-ID');
  let userId;
  let recipientId; //sender becomes recipient
  let itemId;
  let subject;
  moment().format();

  $.get("/api/user_data").then(function(data) {
    userId = data.id;
    let msgId = $("#message-container-ID").data("id");
    $.get(`/api/messages/${msgId}`).then(function(data) {
      console.log(data);
      $("#message-time-ID").text(moment(data.createdAt).format("DD-MM-YYYY h:mm A"));
      $("#message-subject-ID").text(data.subject);
      $("#message-body-ID").text(data.body);
      recipientId = data.AuthorId;
      itemId = data.item_id;
      subject = data.subject;
    });

  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    //todo: validation

    // userId declared at beginning of file
    const replyBody = $("#text-message-ID").val();
    let msg = {
      item_id: itemId,
      subject: subject,
      body: replyBody,
      AuthorId: userId,
      RecipientId: recipientId
    }
    $.post("/api/messages", msg).then((res) => {
      //console.log(res);
      window.location.replace("/messages");
    });

  });

  form.addEventListener('reset', function(e) {

  });

});