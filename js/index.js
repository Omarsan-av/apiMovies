const api_key = '6648a95be2008fe7ba31dec0a9e7c2ce';
const url_api = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&lenguage=es-MX`;
const container = document.getElementById('container');

const loadMovie = async() =>
{
   try 
   {
      const response = await fetch(url_api);

      if(response.status === 200)
      {
         const data = await response.json();
         
         data.results.forEach( movie => 
         {
            const item = document.createElement('div');
            const img = document.createElement('img');
            const title = document.createElement('h3');
            const date = document.createElement('h5');
            const textTitle = document.createTextNode(`${movie.title}`);
            const textDate = document.createTextNode(`Estreno: ${movie.release_date}`)

            img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
            title.appendChild(textTitle);
            date.appendChild(textDate);
            
            container.appendChild(item);
            item.className = 'item';
            img.className = 'item__img';
            title.className = 'item__title';
            date.className = 'item__date';

            item.append(img, title, date);
         });
      }
      else if(response.status === 404)
      {
			console.log('Datos no encontrados');
		} 
      else 
      {
			console.log('Hubo un error y no sabemos que paso');
		}
   }

   catch(error)
   {
      console.log(error);
   }
}

loadMovie()