/*jshint browser: true, devel: true, jquery: true*/
$(document).ready(function () {
    getData();
    $("#new-quote-button").on("click", getData);

    $("#new-quote-button, #tweet-button").on("click", function () {
        this.blur();
    });

    function getData () {
        $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function (data) {
            var encodedURL;

            if (data.quoteText.length + data.quoteAuthor.length + 5 >= 140) {
                getData();
            } else {
                $("#quote").text(data.quoteText);
                if (data.quoteAuthor.length === 0) {
                    $("#quote-author").html('<span id="text-anonymous">Anonymous</span>');
                } else {
                    $("#quote-author").text(data.quoteAuthor);
                }
                encodedURL = encodeURIComponent('"' + data.quoteText + '"' + ' - ' + data.quoteAuthor);
                $("#tweet-button").attr("href", "https://twitter.com/intent/tweet?text=" + encodedURL);
            }
        });
    }
});