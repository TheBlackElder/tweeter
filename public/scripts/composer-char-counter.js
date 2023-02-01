$(document).ready(function () {
  console.log("We are ready!");

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
    }
  });
});

// $(document).ready(function () {
//   console.log("We are ready!");

//   $("#tweet-text").on("input", function () {
//     let maxChars = 10;
//     const input = $(this);
//     const form = input.closest('.counter');
//     const counter = form.find('.counter');
//     let charsEntered = input.val().length;
//     let charsRemaining = maxChars - charsEntered;
//     counter.text(charsRemaining);

//     if (charsRemaining < 0) {
//       counter.addClass("countLimit");
//     } else {
//       counter.removeClass("countLimit");
//     }
//   });
// });