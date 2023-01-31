$(document).ready(function () {
  console.log("We are ready!");

  $("#tweet-text").on("input", function () {
    let count = $('.tweet-counter');
    let maxChars = 140;
    let charsEntered = $("#tweet-text").val().length;
    let charsRemaining = maxChars - charsEntered;
    $(".tweet-counter").text(charsRemaining);
    if (charsEntered > maxChars) {
      count.addClass("countLimit");
    } else {
      count.removeClass("countLimit");
    }
  });
});
