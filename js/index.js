
let page =1;
const api_key = '6648a95be2008fe7ba31dec0a9e7c2ce';
const url_api = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&lenguage=es-MX`;
const container = document.getElementById('container');
const btnPrevious = document.getElementById('btnPrevious');
const btnNext = document.getElementById('btnNext');

btnPrevious.addEventListener('click', () => 
{
   if(page > 1)
   {
      page -= 1;
		loadMovie(`${page}`);
	}
});

btnNext.addEventListener('click', ()=> 
{
   if(page < 1000)
   {
      page +=1;
      loadMovie(`${page}`);
   }
})

const loadMovie = async(page = 1) =>
{
   console.log(page)
   try 
   {
      const response = await fetch(`${url_api}&page=${page}`);

      if(response.status === 200)
      {
         const data = await response.json();

         let movies = '';

         data.results.forEach(movie => 
         {
            movies += `
               <div class="item">
                  <img src = "https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="item__img">
                  <h3 class="item__title">${movie.title}</h3>
                  <h5 class="item__date">Estreno: ${movie.release_date}</h5> 
               </div>
            `;
         });

			container.innerHTML = movies;
         
         // data.results.forEach( movie => 
         // {
         //    let item = document.createElement('div');
         //    let img = document.createElement('img');
         //    let title = document.createElement('h3');
         //    let date = document.createElement('h5');
         //    let textTitle = document.createTextNode(`${movie.title}`);
         //    let textDate = document.createTextNode(`Estreno: ${movie.release_date}`)

         //    img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
         //    title.appendChild(textTitle);
         //    date.appendChild(textDate);
            
         //    container.appendChild(item);
         //    item.className = 'item';
         //    img.className = 'item__img';
         //    title.className = 'item__title';
         //    date.className = 'item__date';

         //    item.append(img, title, date);
         // });
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