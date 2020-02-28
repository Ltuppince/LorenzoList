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
  $('#exampleModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('whatever') // Extract info from data-* attributes
      // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
      // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text('New message to ' + recipient)
    modal.find('.modal-body input').val(recipient)
  });

});