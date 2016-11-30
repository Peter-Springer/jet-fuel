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
    var urlInfo = `<article class="url-info">
                     <a class="result" target="_blank" href="${response[response.length - 1].url}">
                       ${response[response.length - 1].shortURL}
                     </a>
                     <p>${response[response.length - 1].date}</p>
                     <p>Clicks: ${response[response.length - 1].count}</p>
                   </article>`

    $("#urls").append(urlInfo);
  });
}
