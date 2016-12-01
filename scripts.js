'use strict';
import $ from 'jquery';
import _ from 'lodash';
let dateCounter = 0;
let clicksCounter = 0;

function renderLink(link) {
  return `
    <article class="url-info">
      <a class="short-link" href="http://localhost:3000/api/v1/urls/${link.shortURL}">
      http://localhost:3000/api/v1/urls/${link.shortURL}
      </a>
      <p class="date">${link.date}</p>
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

function sortedClicksAscending(links) {
  let newCount = _.sortBy(links, ['count']);
  let ascendingByClicks = newCount.reverse();
  return ascendingByClicks.map(renderLink);
}

function sortedClicksDescending(links) {
  let newCount = _.sortBy(links, ['count']);
  return newCount.map(renderLink);
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
  return alert('Please enter a valid URL address ex: http://website-here');
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

$('.sort-button-date').on('click', function() {
  dateCounter +=1;
  if (dateCounter % 2 !== 0) {
    $.get('http://localhost:3000/api/v1/urls')
    .then(reverseLinks)
    .then(addLinksToPage);
  } else {
    $.get('http://localhost:3000/api/v1/urls')
    .then(renderLinks)
    .then(addLinksToPage);
  }
});

$('.sort-button-clicks').on('click', function() {
    clicksCounter +=1;
    if (clicksCounter % 2 !== 0) {
    $.get('http://localhost:3000/api/v1/urls')
    .then(sortedClicksAscending)
    .then(addLinksToPage);
  } else {
    $.get('http://localhost:3000/api/v1/urls')
    .then(sortedClicksDescending)
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
