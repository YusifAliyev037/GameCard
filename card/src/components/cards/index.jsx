import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from '../cards/style.module.css'

function Cards() {
    const urlId = "https://deckofcardsapi.com/api/deck/new/shuffle";
    const [data, setData] = useState([]);
    const [card, setCard] = useState([]);
    
    useEffect(() => {
        axios({
            url: urlId,
            method: "GET"
        })
        .then((res) => {
            setData(res.data);
        })
        .catch((err) => {console.log(err);});
    }, []);
    
 
   
    const handleClick = () => {
        axios({
            url: `https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/`,
            method: "GET"
        })
        .then((res) => {
            setCard([...card, ...res.data.cards]);
        })
        .catch((err) => {console.error(err)});
    };
    
           
  return (
    <div>
        <button onClick={handleClick}>Click</button>
        <div className={style.cardContainer}>
        {card.map((cards, index) => (
          <img key={index} className={style.cards} src={cards.image} alt={cards.value} />
        ))}
      </div>
    </div>
  )

}

export default Cards;


