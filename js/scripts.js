async function fetchStories() {
    try {
        // fetch the data
        const data = await fetch('https://api.nytimes.com/svc/topstories/v2/science.json?api-key=cuqn1CNAXPPInZkmed1SYAtOGFewjKgB');
        // parse the body
        const json = await data.json();
        // return the data
        return json;
    } catch (error) {
        console.error(error);
    }
}


(async function() {
    let stories = await fetchStories();

    console.log(stories);

    if (!stories) {
        return;
    }

    $('.ajax-loader').hide();

    let science = stories.results.filter(function(story) {
        if (story.multimedia.length <= 0) {
            return;
        }

        const image = story.multimedia.filter(image => image.format === "superJumbo");

        if (!image) return;

        const content = story.abstract;

        const html = `<div class="grid-item">
      <img src='${image[0].url}'/>
      <p>${content}</p>
    </div>`;

        $('.story-grid').append(html);
    });
})();