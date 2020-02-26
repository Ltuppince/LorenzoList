$(document).ready(function() {
    $(".catergoryBtn").on("click", (event) => {
        let categoryID = event.target.id;
        console.log(categoryID);
        // Logic to sort items with the selected category handled here.
    })

    $(".itemCard").on("click", (event) => {
        let itemID = event.target.id
        console.log(itemID);
        // Logic to go to the item page for the selected item
        $.get(`/items/${itemID}`, (res) => {
            window.location.href = `/items/${itemID}`;
        });
    });
});

