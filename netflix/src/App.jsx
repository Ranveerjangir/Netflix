import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './index.css'

function App() {
  const [movies, setMovies] = useState([])
  const [genres, setGenresList] = useState([])
  const [filteredMovies, setFilteredMovies] = useState(null)
  const [selectedGenre, setSelectedGenre] = useState("");
  const [stickySidebar, setStickySidebar] = useState(false)
  const url = 'https://image.tmdb.org/t/p/original'

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=d304399c886fb0207327e7e5b300f91a"
      );
      setMovies(result.data.results)
    }
    fetchData();

    async function getGenreList() {
      const response2 = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=d304399c886fb0207327e7e5b300f91a"
      );
      setGenresList(response2.data.genres);
    }
    getGenreList();

    window.addEventListener("scroll", toggleSidebarStickyness)

    return () => { window.removeEventListener("scroll", toggleSidebarStickyness) }

  }, []);

  function toggleSidebarStickyness() {
    window.onscroll = () => {
      (window.scrollY > 70) ? setStickySidebar(true) : setStickySidebar(false)
    }
  }

  function filterByGenre(e, id) {
    e.preventDefault();
    if (id === "ALL") setFilteredMovies(null)
    else {
      setFilteredMovies(null);
      setFilteredMovies(
        movies.filter((movies) => {
          return movies.genre_ids.includes(id);
        })
      );
      setSelectedGenre(
        genres.find((genre) => {
          return genre.id === id;
        }).name
      );
    }
  }
  

  return (
    <>
      <div className="netflix">
        <div className="sidebar">
          <h3>Genres</h3>
          <ul>
            {/* <div className="logo">
              <img src={netflixLogo} alt="C:\Users\Admin\Desktop\netflix\netflix\src\assets\netflix-logo.png" />
            </div> */}
            <ul style={stickySidebar ? { position: "sticky", top: "0" } : { position: "relative" }}>
              <li>
                <a href="" onClick={(e) => filterByGenre(e, "ALL")}>
                  ALL
                </a>
              </li>
              {genres.map((genre, index) => {
                return (
                  <li key={index}>
                    <a
                      href={"/genre/" + genre.id}
                      onClick={(e) => filterByGenre(e, genre.id)}
                    >
                      {genre.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </ul>
        </div>
        {filteredMovies && filteredMovies.length > 0 ? (
          <div className="movies">
            <h3>Genre: {selectedGenre}</h3>
            <div className="movie-wrapper">
              {filteredMovies.map((movie, index) => {
                return (
                  <div className="movie" key={index}>
                    <img
                      src={img_base_path + movie.poster_path}
                      alt={movie.title || movie.original_title}
                    />
                    <h4>{movie.title || movie.original_title}</h4>
               
                  </div>
                );
              })}
            </div>
          </div>
        ) : filteredMovies !== null && filteredMovies.length === 0 ? (
          <div className="movies">
            <h3> genre</h3>
          </div>
        ) : movies.length > 0 ? (
          <div className="movies">
            <div className="movie-wrapper">
              {movies.map((movie, index) => {
                return (
                  <div className="movie" key={index}>
                    <img
                      src={url + movie.poster_path}
                      alt={movie.title || movie.original_title}
                    />
                    <h4>{movie.title || movie.original_title}</h4>
                  
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}




export default App





















