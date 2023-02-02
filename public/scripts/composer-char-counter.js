$(document).ready(function () {
  // to monitor the character count limit

  $("#tweet-text").on("input", function () {
    let count = $(".tweet-counter");
    let maxChars = 140;
    let charsEntered = $("#tweet-text").val().length;
    let charsRemaining = maxChars - charsEntered;
    count.text(charsRemaining);
    if (charsEntered > maxChars) {
      count.addClass("countLimit");
    } else {
      count.removeClass("countLimit");
      $(".new-tweet-error").slideUp();
    }
  });
});
