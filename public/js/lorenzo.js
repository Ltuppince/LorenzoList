$(document).ready(function() {
  $(".catergoryBtn").on("click", (event) => {
    let categoryID = event.target.id;
    console.log(categoryID);
    // Logic to sort items with the selected category handled here.
  });

  // Button functionality to delete button on click 
  $(".deleteBtn").on("click", (event) => {
    event.preventDefault();
    let itemID = event.target.id;

    $.ajax({
      type: "DELETE",
      url: `/api/items/${itemID}`
    }).then((res) => {
      window.location.reload();
    })
  })

  // View single item on item's card click
  $(".itemCard").on("click", (event) => {
    let itemID = event.target.id;
    $.get(`/items/${itemID}`, (res) => {
      window.location.href = `/items/${itemID}`;
    });
  });

  // View all items button function from user's page
  $("#viewBtn").on("click", (event) => {
    $.get("/items", function(res) {
      window.location.href = "/items";
    });
  });

  // Button functionality to redirect user back to the user page
  $("#profileBtn").on("click", (event) => {
    event.preventDefault();

    $.get("/api/user_data").then((res) => {
      window.location.href = `/users/${res.id}`;
    });
  });


  // code for message modal    
  $('#messageModal').on('show.bs.modal', function(event) {
    const button = $(event.relatedTarget);
    const recipient = button.data('seller');
    const modal = $(this);
    const itemId = modal.find('#item-id').val();
    modal.find('.modal-body input').val(recipient)
    $.get("/api/user_data").then((res) => {
      const sender = res.id;
      $('#btn-send-message-ID').on('click', function(event) {
        const msgBody = $("#message-text").val();
        if (msgBody.length < 1) return;
        let msg = {
          item_id: itemId,
          body: msgBody,
          AuthorId: sender,
          RecipientId: recipient
        }
        $.post("/api/messages", msg).then((res) => {
          //console.log(res);
          modal.modal('hide');
        });
      });
    });
  });



});