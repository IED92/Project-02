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


(async function () {
  let stories = await fetchStories();

  if(!stories) {
    return;
  }

$('.ajax-loader').hide();
  
  let science = stories.results.filter(function (story) {
    // console.log('we\'re in filter');
    if(story.multimedia.length <= 0) {
      return;
    }

    const image = story.multimedia.filter(image => image.format === "Normal");
    // console.log(image[0].url);

    if (!image) return;
    
    const title = story.title;

    const html = `<div class="grid-item">
      <img src='${image[0].url}'/>
      <h1>'${title}'</h1>
    </div>`;

    $('.story-grid').append(html);
  });
  
  // stories.results.forEach((story) => {
  // $('.story-grid').append(`<div class="grid-item">${story.section}</div>`);
  // });

  // console.log(stories);


// fetch('./data.json')
//   .then(response => {
//     return response.json();
//   })
//   .then(data => {
//     // Work with JSON data here
//     const data = JSON.parse(this.response);
//     data.array.forEach(article => {
//       console.log(article.title);
//     });
//     console.log(data);
//   })
//   .catch(err => {
//     // Do something for an error here
//   }); 
})();

