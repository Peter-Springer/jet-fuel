'use strict';
let dateCounter = 0;
let clicksCounter = 0;
// const xhr = new XMLHttpRequest();
const submitButton = document.querySelector('.submit-button');
const urlComponent = document.querySelector('.url-component');
const searchInput = document.querySelector('.search-input');
const urlInfo = document.querySelector('.url-info');

function renderLink(link) {
  debugger;
  return `
    <article class="url-info">
      <a class="short-link" target="_blank" href="http://localhost:3000/api/v1/urls/${link.shortURL}">
      http://localhost:3000/api/v1/urls/${link.shortURL}
      </a>
      <p class="date">${link.date}</p>
      <p>Clicks: ${link.count}</p>
    </article>
    `;
}

function renderLinks() {
  console.log(this)
  // debugger;
  let links = JSON.parse(this.response)
  //  links.map(renderLink);
   addLinksToPage(links.map(renderLink));
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
  document.querySelector('#urls').innerHTML = links;
}

function fetchAllUrls() {
  // $.get('http://localhost:3000/api/v1/urls')
  // .then(renderLinks)
  //   .then(addLinksToPage);
  let xhr = new XMLHttpRequest();
  xhr.addEventListener('load', renderLinks);
  xhr.open('GET', '/api/v1/urls');
  xhr.send();
}

function validUrl(url) {
  var urlTest = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return urlTest.test(url);
}

function callBackResponse() {
  fetchAllUrls();
  // console.log(this)
}

submitButton.addEventListener('click', function(e) {
  e.preventDefault();
  let url = JSON.stringify({url: urlComponent.value});

  if (!validUrl(url)) {
  return alert('Please enter a valid URL address ex: http://website-here');
}
  let xhr = new XMLHttpRequest();
  xhr.addEventListener('load', callBackResponse);
  xhr.open('POST', '/api/v1/urls', true);
  xhr.setRequestHeader("Content-type", "application/json");

  xhr.send(url);
  // $.post('http://localhost:3000/api/v1/urls',
  //   {
  //     url: $('.url-component').val()
  //   }).then(fetchAllUrls()).done(
  //       function() {
  //   console.log('success!');
  // });
  urlComponent.value = '';
});

// $("input").keyup(function(){
//     var txt = $("input").val();
//     $.post("demo_ajax_gethint.asp", {suggest: txt}, function(result){
//         $("span").html(result);
//     });
// });

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

$('.sort-clicks-button').on('click', function() {
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

searchInput.addEventListener('keyup', (function() {
  var filter = this.value;
  urlInfo.each(function() {
    if(this.text.search(new RegExp(filter, 'i')) < 0) {
      this.style.visibility = 'hidden';
    }
    else {
      this.style.visibility = 'visible';
    }
  });
}));
