import $ from 'jquery'

$('.submit').on('click', function(e) {
  e.preventDefault();
  const url = $('.url-component').val();

  if (!validUrl(url)) {
  return alert('Please enter a valid URL address');
}

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

function validUrl(url) {
  var urlTest = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return urlTest.test(url);
}
