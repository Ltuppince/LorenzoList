$(document).ready(function() {
    $(".catergoryBtn").on("click", (event) => {
        let categoryID = event.target.id;
        console.log(categoryID);
        // Logic to sort items with the selected category handled here.
    });

    // Delete item from user's page
    // $(".deleteBtn").on("click", (event) => {
    //     event.preventDefault();
    //     // Logic handled here...
    //     let itemID = event.target.id;
    //     $.delete(`/api/items/${itemID}`, (res) => {
    //         // window.location.reload();
    //         console.log(res);
    //     });
    // });

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

    // -------- TEST ------------ TRYING TO GET BACK TO USER PROFILE FROM VIEW ITEM PAGE 
    $("#profileBtn").on("click", (email) => {
        console.log(email);
        // let id = email.id
        // $.get(`/users/${id}`, (res) => {
        //   window.location.href = `/users/${email.id}`;
        // });
    });
});

