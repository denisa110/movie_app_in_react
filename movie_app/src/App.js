// import "./App.css";
// import MovieCard from "./components/MovieCard/MovieCard";
// import { useEffect, useState } from "react";
// import axios from "axios";

// // const api_url =
// //   "https://api.themoviedb.org/3/trending/all/day?api_key=b95b8ee73ed79d4a81c6b20c58f68c59";
// // function App() {
// //   const [movies, setMovies] = useState([]);
// //   const [query, setQuery] = useState("");
  
// //   useEffect(() => {
// //     fetch(api_url)
// //       .then((res) => res.json())
// //       .then((data) => {
// //         console.log(data);
// //         setMovies(data.results);
// //       });
// //   }, []);
// // }

// function App() {
//   //utilizare functii asincrone
//   // Cuvintele cheie async și await sunt folosite împreună pentru a gestiona funcții asincrone într-un mod mai lizibil și similar cu codul sincron
//   //O funcție declarată cu async returnează întotdeauna o promisiune await
//   const getMovies = async () => {
//     try {
//       const data = await axios.get(
//         "https://api.themoviedb.org/3/trending/all/day?api_key=b95b8ee73ed79d4a81c6b20c58f68c59"
//       );
//       console.log(data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   //permite rularea codului ca raspuns la evenimente (ex: modificare api)
//   //Va rula ori de cate ori una dintre dependenta se schimba
//   useEffect(() => {
//     getMovies();
//   },
//   //dependency array
//   [])

//   return (
//     <div className="App">
//       <h1> Movies </h1>
//       <MovieCard/>
//     </div>
//   )
// }

// export default App;

import React,{useState,useEffect} from 'react';
import './App.css';
import MovieCard from './components/MovieCard/MovieCard';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Container,Nav,Form, FormControl,Button } from 'react-bootstrap';

const API_URL ="https://api.themoviedb.org/3/trending/all/day?api_key=b95b8ee73ed79d4a81c6b20c58f68c59";

function App() {

  const [movies, setMovies]=useState([]);
  const [query, setQuery]=useState('');

  useEffect(() => {
    fetch(API_URL)
    .then((res)=>res.json())
    .then(data=>{
      console.log(data);
      setMovies(data.results);
    })
  }, [])


  const searchMovie = async(e)=>{
    e.preventDefault();
    console.log("Searching");
    try{
      const API_SEARCH = `https://api.themoviedb.org/3/trending/all/day?api_key=b95b8ee73ed79d4a81c6b20c58f68c59=${query}`;
      const res = await fetch(API_SEARCH);
      const data= await res.json();
      console.log(data);
      setMovies(data.results);
    }
    catch(e){
      console.log(e);
    }
  }

  const changeHandler=(e)=>{
    setQuery(e.target.value);
  }
  return (
    <>
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/home">MovieDb App</Navbar.Brand>
        <Navbar.Brand href="/home">Trending</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>

          <Navbar.Collapse id="nabarScroll">
            <Nav 
            className="me-auto my-2 my-lg-3"
            style={{maxHeight:'100px'}}
            navbarScroll></Nav>

            <Form className="d-flex" onSubmit={searchMovie} autoComplete="off">
              <FormControl
              type="search"
              placeholder="Movie Search"
              className="me-2"
              aria-label="search"
              name="query"
              value={query} onChange={changeHandler}></FormControl>
              <Button variant="secondary" type="submit">Search</Button>
            </Form>
          </Navbar.Collapse>
      </Container>
    </Navbar>
    <div>
        {movies && movies.length > 0 ? (
          <div className="grid">
            {movies.map((movieReq) => (
              <MovieCard key={movieReq.id} {...movieReq} />
            ))}
          </div>
        ) : (
          <h2>Sorry !! No Movies Found</h2>
        )}
      </div>
    </>
   
  );
}

export default App;

