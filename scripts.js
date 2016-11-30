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
     template(response[response.length-1])
  })
}

function template(link) {
  $("#urls").append(
    `<article class="url-info">
    <a class="result" target="_blank" href="${link.url}">
    ${link.shortURL}
    </a>
    <p>${link.date}</p>
    <p>Clicks: ${link.count}</p>
    </article>`
  )
}

$('.sort').on('click', function() {
     console.log('wired up')
})

function validUrl(url) {
  var urlTest = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return urlTest.test(url);
}

$('.search-input').keyup(function() {
  var filter = $(this).val();
  $('.url-info').each(function() {
    if($(this).text().search(new RegExp(filter, 'i')) < 0) {
      $(this).fadeOut();
    }
    else {
      $(this).fadeIn();
    }
  });
});
