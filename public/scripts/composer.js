$(document).ready(function () {

  $(window).scroll(function() {
    const scrollTop = $(this).scrollTop();
    if (scrollTop > 100) {
      $("#page-scrollUp").show();
    } else {
      $("#page-scrollUp").hide();
    }
  });

  $("#page-scrollUp").on("click", (event) => {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 100);
    $(".new-tweet").slideDown("medium");
    $('#tweet-text').focus();
  });
});

