/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  // Test / driver code (temporary). Eventually will get this from the server.
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

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
 ${tweet.content.text}
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
    if (tweetText.length === 0) {
      alert("No content detected");
    } else if (tweetText.length > maxTweetLength) {
      alert("Surpassed valid character limit of 140 characters");
    } else {
      console.log("tweet text is:", tweetText);
      $.ajax("/tweets", { method: "POST", data: $(this).serialize() }).then(
        () => {
          console.log("success");
        }
      );
    }
  });

  const loadTweets = function () {
    $.ajax("/tweets/", { method: "GET" }).then((tweets) =>
      renderTweets(tweets)
    );
  };
  loadTweets();
});

