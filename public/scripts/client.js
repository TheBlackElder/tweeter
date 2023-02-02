/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

// toggle tweet textarea 
  $(".right-navbar").on("click", function () {
    $('.new-tweet').toggle();
    $('#tweet-text').focus();
  });

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const renderTweets = function (tweets) {
    console.log("Which tweets", tweets);
   
    // loops through tweets
    for (let tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $("#tweet-container").prepend($tweet);
    }
  };

  const createTweetElement = function (tweet) {
    console.log("These tweets", tweet);
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

  $(".tweet-form").on("submit", function (event) {
    event.preventDefault();
  
    let tweetText = $("#tweet-text").val();
    let maxTweetLength = 140;
    console.log("tweet length", tweetText.length);
    if (tweetText.length === 0) {
     
      const errorText = $('<i class="fa-solid fa-triangle-exclamation"></i> <span>This field is empty, compose your tweet.</span>');
      $('.new-tweet-error').html(errorText);
      $('.new-tweet-error').slideDown();
      // $('.new-tweet-error').slideToggle();
     
    } else if (tweetText.length > maxTweetLength) {
      
      const errorText = $('<i class="fa-solid fa-triangle-exclamation"></i> <span>This field cannot exceed 140 characters</span>');
      $('.new-tweet-error').html(errorText);
      $('.new-tweet-error').slideDown();
      // $('.new-tweet-error').slideToggle();
    
    } else {
      // $('.new-tweet-error').slideToggle();
      $('.new-tweet-error').slideUp();
      $.ajax("/tweets", { method: "POST", data: $(this).serialize() }).then(
        () => {
          console.log("success");
          $("#tweet-container").empty();
          $('.tweet-form')[0].reset();
          loadTweets();
        }
      );
    }
  });

 
  const loadTweets = function () {
    $.ajax("/tweets/", { method: "GET" }).then((tweets) => {
    console.log("this tweets", tweets)
      renderTweets(tweets)
    }
    );
  };
  loadTweets();

});


