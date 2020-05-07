$(function () {
  const searchField = $("#query");
  const icon = $("#search-btn");

  $(searchField).on("focus", function () {
    $(this).animate(
      {
        width: "100%",
      },
      400
    );
    $(icon).animate(
      {
        right: "10px",
      },
      400
    );
  });

  $(searchField).on("blur", function () {
    if (searchField.val() === "") {
      $(searchField).animate(
        {
          width: "45%",
        },
        400,
        function () {}
      );
      $(icon).animate(
        {
          right: "360px",
        },
        400,
        function () {}
      );
    }
  });

  $("#search-form").submit(function (event) {
    event.preventDefault();
  });
});

const crossSearch = () => {
  $("#results").html("");
  $("#buttons").html("");

  $.get(
    "https://www.googleapis.com/youtube/v3/playlistItems",
    {
      part: "snippet, id, contentDetails, status",
      playlistId: "UUQvArx1zBE0RIJCKmoNwj5Q",
      key: "AIzaSyDH_QF8pm3YlfBfeYW6hpD_SMLw2tnsTqo",
    },
    (data) => {
      $.each(data.items, function (i, item) {
        const output = getCrossOutput(item);

        $("#results").append(output);
      });
    }
  );
};

const search = () => {
  $("#results").html("");
  $("#buttons").html("");
  const searchQuery = $("#query").val();
  // AIzaSyDH_QF8pm3YlfBfeYW6hpD_SMLw2tnsTqo
  // https://www.googleapis.com/youtube/v3/search?part=snippet%2C+id&q=skateboarding%20dog&type=video&videoDefinition=high&key=AIzaSyDH_QF8pm3YlfBfeYW6hpD_SMLw2tnsTqo
  // https://www.googleapis.com/youtube/v3/search?part=snippet%2C+id&q=travel&type=channel&key=AIzaSyDH_QF8pm3YlfBfeYW6hpD_SMLw2tnsTqo
  // https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=Pastor%20Tara%20Samuel&key=AIzaSyDH_QF8pm3YlfBfeYW6hpD_SMLw2tnsTqo
  // https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=UCQvArx1zBE0RIJCKmoNwj5Q&key=AIzaSyDH_QF8pm3YlfBfeYW6hpD_SMLw2tnsTqo
  // https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2C+id%2CcontentDetails%2Cstatus&playlistId=UUQvArx1zBE0RIJCKmoNwj5Q&key=AIzaSyDH_QF8pm3YlfBfeYW6hpD_SMLw2tnsTqo

  $.get(
    "https://www.googleapis.com/youtube/v3/search",
    {
      part: "snippet, id",
      q: searchQuery,
      type: "video",
      key: "AIzaSyDH_QF8pm3YlfBfeYW6hpD_SMLw2tnsTqo",
      videoDefinition: "high",
    },
    (data) => {
      const nextPageToken = data.nextPageToken;
      const prevPageToken = data.prevPageToken;

      $.each(data.items, function (i, item) {
        const output = getOutput(item);

        $("#results").append(output);
      });

      const buttons = getButtons(prevPageToken, nextPageToken);
      $("#buttons").append(buttons);
    }
  );
};

const nextPage = () => {
  const token = $("#next-button").data("token");
  const searchQuery = $("#next-button").data("query");

  $("#results").html("");
  $("#buttons").html("");
  // const searchQuery = $("#query").val();

  $.get(
    "https://www.googleapis.com/youtube/v3/search",
    {
      part: "snippet, id",
      q: searchQuery,
      type: "video",
      pageToken: token,
      key: "AIzaSyDH_QF8pm3YlfBfeYW6hpD_SMLw2tnsTqo",
      videoDefinition: "high",
    },
    (data) => {
      const nextPageToken = data.nextPageToken;
      const prevPageToken = data.prevPageToken;

      $.each(data.items, function (i, item) {
        const output = getOutput(item);

        $("#results").append(output);
      });

      const buttons = getButtons(prevPageToken, nextPageToken);
      $("#buttons").append(buttons);
    }
  );
};

const prevPage = () => {
  const token = $("#prev-button").data("token");
  const searchQuery = $("#prev-button").data("query");

  $("#results").html("");
  $("#buttons").html("");
  // const searchQuery = $("#query").val();

  $.get(
    "https://www.googleapis.com/youtube/v3/search",
    {
      part: "snippet, id",
      q: searchQuery,
      type: "video",
      pageToken: token,
      key: "AIzaSyDH_QF8pm3YlfBfeYW6hpD_SMLw2tnsTqo",
      videoDefinition: "high",
    },
    (data) => {
      const nextPageToken = data.nextPageToken;
      const prevPageToken = data.prevPageToken;

      $.each(data.items, function (i, item) {
        const output = getOutput(item);

        $("#results").append(output);
      });

      const buttons = getButtons(prevPageToken, nextPageToken);
      $("#buttons").append(buttons);
    }
  );
};

const getCrossOutput = (item) => {
  const videoId = item.snippet.resourceId.videoId;
  const title = item.snippet.title;
  const description = item.snippet.description;
  const thumb = item.snippet.thumbnails.high.url;
  const channelTitle = item.snippet.channelTitle;
  const videoDate = item.snippet.publishedAt;

  let output =
    "<li>" +
    "<div class='list-left'>" +
    "<img src='" +
    thumb +
    "'>" +
    "</div>" +
    "<div class='list-right'>" +
    "<h3><a class='fancybox fancybox.iframe' href = 'http://www.youtube.com/embed/" +
    videoId +
    "'>" +
    title +
    "</a></h3>" +
    "<small>By <span class='cTitle'>" +
    channelTitle +
    "</span> on " +
    videoDate +
    "</small>" +
    "<p>" +
    description +
    "</p>" +
    "</div>" +
    "</li>" +
    "<div class='clearfix'></div>" +
    "";
  return output;
};

const getOutput = (item) => {
  const videoId = item.id.videoId;
  const title = item.snippet.title;
  const description = item.snippet.description;
  const thumb = item.snippet.thumbnails.high.url;
  const channelTitle = item.snippet.channelTitle;
  const videoDate = item.snippet.publishedAt;

  let output =
    "<li>" +
    "<div class='list-left'>" +
    "<img src='" +
    thumb +
    "'>" +
    "</div>" +
    "<div class='list-right'>" +
    "<h3><a class='fancybox fancybox.iframe' href = 'http://www.youtube.com/embed/" +
    videoId +
    "'>" +
    title +
    "</a></h3>" +
    "<small>By <span class='cTitle'>" +
    channelTitle +
    "</span> on " +
    videoDate +
    "</small>" +
    "<p>" +
    description +
    "</p>" +
    "</div>" +
    "</li>" +
    "<div class='clearfix'></div>" +
    "";

  return output;
};

const getButtons = (prevPageToken, nextPageToken) => {
  const searchQuery = $("#query").val();
  if (!prevPageToken) {
    var btnoutput =
      "<div class = 'button-container'></div>" +
      "<button id='next-button' class='paging-button' data-token='" +
      nextPageToken +
      "' data-query = '" +
      searchQuery +
      "' onclick='nextPage();'>" +
      "Next Page" +
      "</button>" +
      "</div>";
  } else {
    var btnoutput =
      "<div class = 'button-container'></div>" +
      "<button id='prev-button' class='paging-button' data-token='" +
      prevPageToken +
      "' data-query = '" +
      searchQuery +
      "' onclick='prevPage();'>" +
      "Prev Page" +
      "</button>" +
      "<button id='next-button' class='paging-button' data-token='" +
      nextPageToken +
      "' data-query = '" +
      searchQuery +
      "' onclick='nextPage();'>" +
      "Next Page" +
      "</button>" +
      "</div>";
  }
  return btnoutput;
};
