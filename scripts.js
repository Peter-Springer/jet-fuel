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
  $('.url-component').val('');
});

function renderURL() {
  $.get("http://localhost:3000/api/v1/urls").then((response) => {
    var urlInfo = `<article>
                     <a class="result" href="http://${response[response.length - 1].url}">
                       ${response[response.length - 1].shortURL}
                     </a>
                     <h3>${response[response.length - 1].date}</h3>
                   </article>`

    $("#urls").append(urlInfo);
  });
}
