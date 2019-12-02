$('.ajax-loader').hide();

async function fetchStories(section) {
    try {
        // fetch the data
        const data = await fetch(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=cuqn1CNAXPPInZkmed1SYAtOGFewjKgB`);
        // parse the body
        const json = await data.json();
        // return the data
        return json;
    } catch (error) {
        console.error(error);
    }
}

(function(){
    $('#sections').change(async function() {
        $('.story-grid').empty();
        $('.ajax-loader').show();
        let section = $(this).val();
        let stories = await fetchStories(section).catch(error => console.error(error));
        
        if (!stories) {
          return;
        }

        $('.ajax-loader').hide();

        let article = stories.results.filter(function(story) {
          
        if (story.multimedia.length <= 0) {
            return;
        }

        const image = story.multimedia.filter(image => image.format === "superJumbo");
        return image && story;
    });


    article.forEach((story, index) => {
        if (index >= 12) return false;
        
        const content = story.abstract;

        const image = story.multimedia[4];

        const html =`<div class="grid-item">
        <img src='${image.url}'/>
        <p>${content}</p>
        </div>`;

        $('.story-grid').append(html);
    });
    });
})();
