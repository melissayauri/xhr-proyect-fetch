/* llamando a la ventana para que cargen todas la funciones*/
window.addEventListener('load', function() {
  /* asignando valores*/
  const form = document.getElementById('search-form');
  const searchField = document.getElementById('search-keyword');
  const responseContainer = document.getElementById('response-container');
  let searchedForText;
  /* Incorporando evento submit*/
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    responseContainer.innerHTML = '';
    searchedForText = searchField.value;
    /* getNews();*/
    let link = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=65082f4668484e9484931f976feb3d4c`;
    fetch(link)
    .then(handleError)
    .then(parseJSON)
    .then(addNews)
    .catch(displayError);
  });

  function handleError(result) {
    if (!result.ok) {
      throw Error(result.status);
    }
    return result;
  };

  function parseJSON(result) {
    return result.json().then(function(data) {
      return data.response.docs;
    });
  }
  function addNews(data) {
    /* recorrido en la data*/
    data.forEach(function(value, i) {
      console.log(data[i]);
      /* variables*/
      const title = data[i].headline.main;
      const snippet = data[i].snippet;
      const web = data[i].web_url;
      const imgs = data[i].multimedia[0].url;
      console.log(web);
      /* creación del contenedor*/
      let container = document.createElement('div');
      container.className = 'articleClass';
      responseContainer.appendChild(container);
      /* creación del título*/
      let header = document.createElement('h5');
      header.className = 'title';
      container.appendChild(header);
      header.innerText = title;
      /* creación de la información*/
      let text = document.createElement('p');
      container.appendChild(text);
      text.innerText = snippet;
      /* incorporando la imagen*/
      let imagen = document.createElement('img');
      imagen.className = 'imagen';
      imagen.setAttribute('src', `https://static01.nyt.com/${imgs}`);
      container.appendChild(imagen);
      /* creación del link para ver más información*/
      let moreText = document.createElement('a');
      moreText.className = 'link';
      moreText.innerText = 'Ver más';
      moreText.setAttribute('href', web);
      moreText.setAttribute('target', '_blank');
      container.appendChild(moreText);
    });
  };
  function displayError(error) {
    alert('se ha presentado un error');
    alert(error);
  }
});
