$(document).ready(function() {

  let userId;

  $.get("/api/user_data").then(function(data) {
    userId = data.id;
  });

  populateCategories();

  const apikey = "A3fHU5w6XSQa3yQw3l2vQz";
  const client = filestack.init(apikey);
  const options = {
    onUploadDone: updateForm,
    maxSize: 10 * 1024 * 1024,
    accept: 'image/jpeg',
    uploadInBackground: false,
    fromSources: ["local_file_system"]
  };
  const picker = client.picker(options);
  const form = document.getElementById('form-new-item-ID');
  const fileInput = document.getElementById('fileupload');
  const btn = document.getElementById('picker');

  btn.addEventListener('click', function(e) {
    e.preventDefault();
    picker.open();
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    //todo: validation

    // userId declared at beginning of file
    const categoryId = $("#select-categories-ID").val();
    const title = $("#input-title-ID").val();
    const price = $("#input-price-ID").val();
    const post = $("#text-desctiption-ID").val();
    const img = fileInput.value;
    console.log(userId, categoryId, title);
    postNewItem(userId, categoryId, title, parseInt(price), post, img);
  });

  function updateForm(result) {
    const fileData = result.filesUploaded[0];
    fileInput.value = fileData.url;
    $("#text-selected-image-ID").text(fileData.url);
  };

  form.addEventListener('reset', function(e) {

  });

  function postNewItem(userId, categoryId, title, price, post, imgURL) {
    $.post("/api/items", {
        UserId: userId,
        CategoryId: categoryId,
        title: title,
        price: price,
        post: post,
        img: imgURL
      })
      .then(function(data) {
        console.log(data);
        window.location.replace(`/items/${data.id}`);
      })
      .catch(handleNewItemErr);
  }

  function handleNewItemErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});

function populateCategories() {
  $.get("/api/categories").then(function(data) {
    let select = $("#select-categories-ID");
    select.empty();
    data.forEach(function(c) {
      let opt = $("<option>").attr("value", c.id);
      opt.text(c.name);
      select.append(opt);
    });
  }).catch(function(err) {
    console.log(err);
  });

}