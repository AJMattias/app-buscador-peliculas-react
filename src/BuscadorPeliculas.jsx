import { useState } from "react"

export const BuscadorPeliculas = () => {

    const urlBase ='https://api.themoviedb.org/3/search/movie'
    const apiKey = 'd112ff5f0a936e2fba056b834b165546'

    const [busquedaPelicula, setBusquedaPelicula] = useState('')
    const [peliculas, setPeliculas] = useState([])

    const handleInputPelicula = (e) => {
        setBusquedaPelicula(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchPeliculas()
    }

    const fetchPeliculas = async () => {
        try {
          const response = await fetch(`${urlBase}?query=${busquedaPelicula}&api_key=${apiKey}`)
          const data = await response.json()
          console.log(data.results)
          setPeliculas(data.results)
        } catch (error) {
          console.error('Ha ocurrido un error: ', error)
        }
      }

  return (
    <div className="container">
        <h1 className="title">Buscador de Peliculas</h1>
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                value={busquedaPelicula} 
                placeholder="Buscar pelicula"   
                onChange={handleInputPelicula}
            />
            <button type="submit" className="search-button">Buscar</button>
        </form>

       <div className="movie-list">
        {peliculas.map((pelicula) => (
            <div key={pelicula.id} className="movie-card">
                <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title} />
                <h2>{pelicula.title}</h2>
                <p>{pelicula.overview}</p>
            </div>
        ))}
       </div>

        {/* <div className="movie-list">
            {peliculas.map((pelicula) => (
            <div key={pelicula.id} className="movie-card">
                <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title} />
                <h2>{pelicula.title}</h2>
                <p>{pelicula.overview}</p>
            </div>
            ))}
      </div> */}
    </div>
  )
}

