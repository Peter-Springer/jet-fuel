'use strict';
import $ from 'jquery';
let count = 0;

function renderLink(link) {
  return `
    <article class="url-info">
      <a class="short-link" target="_blank" href="${link.url}">
      ${link.shortURL}
      </a>
      <p>${link.date}</p>
      <p>Clicks: ${link.count}</p>
    </article>
    `;
}

function renderLinks(links) {
  return links.map(renderLink);
}

function reverseLinks(links) {
  return links.map(renderLink).reverse();
}

function addLinksToPage(links) {
  $('#urls').html(links);
}

function fetchAllUrls() {
  $.get('http://localhost:3000/api/v1/urls')
  .then(renderLinks)
  .then(addLinksToPage);
}

function validUrl(url) {
  var urlTest = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return urlTest.test(url);
}

$('.submit-button').on('click', function(e) {
  e.preventDefault();
  const url = $('.url-component').val();

  if (!validUrl(url)) {
  return alert('Please enter a valid URL address');
}

  $.post('http://localhost:3000/api/v1/urls',
    {
      url: $('.url-component').val()
    }).then(fetchAllUrls()).done(
        function() {
    console.log('success!');
  });
  $('.url-component').val('');
});

$('.sort-button').on('click', function() {
  count +=1;
  if (count % 2 !== 0) {
    $.get('http://localhost:3000/api/v1/urls')
    .then(reverseLinks)
    .then(addLinksToPage);
  } else {
    $.get('http://localhost:3000/api/v1/urls')
    .then(renderLinks)
    .then(addLinksToPage);
  }
});

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

// $('.short-link').on('click', function() {
//   $.put("http://localhost:3000/api/v1/urls")
// })
