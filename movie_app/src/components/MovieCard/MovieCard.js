import React, {useState} from "react";
import { Modal } from 'react-bootstrap';

const api_img = "https://image.tmdb.org/t/p/w500/"

const MovieCard =({title, poster_path, vote_average, release_date, overview}) =>{
 
    const [show, setShow] = useState (false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow (false);

   return (
    <div className="card"> 
    <div className="card_body" >
     <img className="card_img" src={api_img + poster_path}/>
     <div className="text_card"> 
      <button type="button" className="btn_view_more"> View More </button>
       {/* Afiseaza un continut suplimentar peste pagina, ex: popup   */}
      <Modal show={show} onHide={handleClose}>
    //Header modal
         <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
         </Modal.Header> 
    //Body Modal
         <Modal.Body>
          <img className="card_img" src={api_img + poster_path}/> 
          <h1> {title} </h1>
          <h3> IMDb: {vote_average} </h3>
          <h3> Data: {release_date}</h3>
          <br></br>
          //Recomandare film utilizand o expresie conditionata
         <div className='recommended'>
            { vote_average  >= 6.9 ? (
                   <h2>Trebuie să vezi acest film! </h2>
                  ) : (
                   <h2>Nu este recomandat acest film. </h2>
            )}
           <p> <span> Descriere: </span> <br/>
           {overview} </p>
          </div>

          </Modal.Body> 

      </Modal>
     </div>
      </div>
    </div>
   )
}

export default MovieCard;