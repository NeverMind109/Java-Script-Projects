$(document).ready(function () {
  const key = "AIzaSyDIKCJHiZbzshLvyFH-8btlnOCAa1eILoY";
  const playlistId = "RDCLAK5uy_mPolD_J22gS1SKxufARWcTZd1UrAH_0ZI";
  const URL = "https://www.googleapis.com/youtube/v3/playlistItems";

  const options = {
    part: "snippet",
    key: key,
    maxResults: 50,
    playlistId: playlistId,
  };

  loadVids();
  function loadVids() {
    $.getJSON(URL, options, function (data) {
      const id = data.items[17].snippet.resourceId.videoId;
      mainVideo(id);

      resultsLoop(data);
    });
  }

  function mainVideo(id) {
    $("#video").html(`
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/${id}"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
    `);
  }

  function resultsLoop(data) {
    $.each(data.items, function (idx, item) {
      const thumb = item.snippet.thumbnails.medium.url;
      const title = item.snippet.title;
      const descr = item.snippet.description.substring(0, 100);
      const vid = item.snippet.resourceId.videoId;

      $("main").append(`
      <article class="item" data-key="${vid}">
        <img class="thumb" src="${thumb}" alt="Thumbnail" />
        <div class="details">
          <h4>${title}</h4>
          <p>${descr}</p>
        </div>
      </article>
      `);
    });
  }

  $("main").on("click", "article", function () {
    const id = $(this).attr("data-key");
    mainVideo(id);
  });
});
