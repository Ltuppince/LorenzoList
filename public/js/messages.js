$(document).ready(function() {

  let userId;
  moment().format();

  $.get("/api/user_data").then(function(data) {
    userId = data.id;

    $.get(`/api/messages/recipient/${userId}`).then(function(data) {
      console.log(userId);
      console.log(data[0]);
      data.forEach((msg, i) => {
        let li = $("<li>").attr("data-messageid", msg.id);
        let row = $("<div>").addClass("row");
        if (i % 2 === 0) row.attr("style", "background-color: lightgrey;")
        let dateCol = $("<div>").addClass("col-2");
        let subjectCol = $("<div>").addClass("col-4 message");
        let bodyCol = $("<div>").addClass("col-6 message");
        dateCol.text(moment(msg.createdAt).format("DD-MM-YYYY h:mm A"));
        subjectCol.text(msg.subject);
        bodyCol.text(msg.body);
        row.append(dateCol, subjectCol, bodyCol);
        li.append(row);
        $("#inbox-ID").append(li);
      });
    });
  });

  $("ul").on("click", function(event) {
    console.log(event.target);
    let p = $(event.target).parent().parent();
    let msgId = p.data("messageid");
    console.log(msgId);
    window.location.replace(`/message/${msgId}`);
  });

});