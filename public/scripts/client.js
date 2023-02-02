$(document).ready(function () {
  // toggle tweet textarea from navbar
  $(".right-navbar").on("click", function () {
    $(".new-tweet").toggle();
    $("#tweet-text").focus();
  });

  // escape function to avoid XSS
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // prepend tweets to container
  const renderTweets = function (tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweet-container").prepend($tweet);
    }
  };

  // access tweet database to create new tweet
  const createTweetElement = function (tweet) {
    let $tweet = `
<article class="tweets" >
<header class="tweet-header" >
  <div class="tweet-headerProfile">
  <img src='${tweet.user.avatars}'>
    <label class="tweet-username" > ${tweet.user.name} </label>
  </div>
  <label class="tweet-handle" >
   ${tweet.user.handle}
  </label>
</header>
<span class="tweet-body">
 ${escape(tweet.content.text)}
</span>
<footer class="tweet-footerIcons" >
  <label class="tweet-time">
    ${timeago.format(tweet.created_at)}
  </label>
  <div >
    <i class="fa-solid fa-flag"></i>
    <i class="fa-solid fa-retweet"></i>
    <i class="fa-solid fa-heart"></i>
  </div>
</footer>
</article>
`;
    return $tweet;
  };

  // submit new tweet with a form with error conditions to toggle

  $(".tweet-form").on("submit", function (event) {
    event.preventDefault();

    let tweetText = $("#tweet-text").val();
    let maxTweetLength = 140;
    console.log("tweet length", tweetText.length);
    if (tweetText.length === 0) {
      const errorText = $(
        '<i class="fa-solid fa-triangle-exclamation"></i> <span>This field is empty, compose your tweet.</span>'
      );
      $(".new-tweet-error").html(errorText);
      $(".new-tweet-error").slideDown();
    } else if (tweetText.length > maxTweetLength) {
      const errorText = $(
        '<i class="fa-solid fa-triangle-exclamation"></i> <span>This field cannot exceed 140 characters.</span>'
      );
      $(".new-tweet-error").html(errorText);
      $(".new-tweet-error").slideDown();
    } else {
      $(".new-tweet-error").slideUp();
      $.ajax("/tweets", { method: "POST", data: $(this).serialize() }).then(
        () => {
          console.log("success");
          $("#tweet-container").empty();
          $(".tweet-form")[0].reset();
          $(".tweet-counter").text(140);
          loadTweets();
        }
      );
    }
  });

  // load tweets to page from tweets route
  const loadTweets = function () {
    $.ajax("/tweets/", { method: "GET" }).then((tweets) => {
      console.log("this tweets", tweets);
      renderTweets(tweets);
    });
  };
  loadTweets();
});
