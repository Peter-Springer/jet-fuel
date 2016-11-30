import $ from 'jquery'

$('.submit').on('click', function(e) {
  e.preventDefault();
  $.post("http://localhost:3000/api/v1/urls",
    {
      url: $('.url-component').val()
    }).then(renderURL()).done(
        function() {
    console.log( "success!");
  });
});

function renderURL() {
  $.get("http://localhost:3000/api/v1/urls").then((response) => {
    $("#urls").append(response[response.length - 1].shortURL + '<br>');
  });
}
