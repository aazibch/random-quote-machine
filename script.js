$(document).ready(function () {
  getData();
  $('#new-quote').on('click', getData);

  $('#new-quote, #tweet-quote').on('click', function () {
    this.blur();
  });

  function getData() {
    $.getJSON(
      'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?',
      function (data) {
        var encodedURL;

        if (data.quoteText.length + data.quoteAuthor.length + 5 >= 140) {
          getData();
        } else {
          $('#text').text(data.quoteText);
          if (data.quoteAuthor.length === 0) {
            $('#author').html('<span id="text-anonymous">Anonymous</span>');
          } else {
            $('#author').text(data.quoteAuthor);
          }
          encodedURL = encodeURIComponent(
            '"' + data.quoteText + '"' + ' - ' + data.quoteAuthor
          );
          $('#tweet-quote').attr(
            'href',
            'https://twitter.com/intent/tweet?text=' + encodedURL
          );
        }
      }
    );
  }
});
