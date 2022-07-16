import react, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './component/MovieRow';
import FeaturedMovie from './component/FeaturedMovie';
import Header from './component/Header';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect (() => {
    const loadAll = async () => {
       // Pegando os filmes
       let list = await Tmdb.getHomeList();
       setMovieList(list);
       
       // Filme em destaque
       let originals = list.filter(i=>i.slug === 'originals');
       let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
       let chosen  = originals[0].items.results[randomChosen];
       let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
       setFeaturedData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className='page'>

      <Header black={blackHeader} />

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }
      <section className='lists'>
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        <h3>Feito por João Gabriel</h3>
        <h3>Direitos de imagem para Netflix</h3>
        <h3>Dados do site Themoviedb.org</h3>
      </footer>

      {movieList.length <=0 &&
      <div className='loading'>
        <img src='https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif' alt='Carregando'></img>
      </div>
       }
    </div>
  );
}