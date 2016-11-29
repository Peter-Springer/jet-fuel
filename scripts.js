import $ from 'jquery'

$('.submit').on('click', function(e) {
  e.preventDefault()
  console.log('kirstennn')
  $.post( "http://localhost:3000/api/v1/urls",
    {
      url: $('.url-component').val()
    })
  .done(function() {
    console.log( "success!");
  });
})
