import React from 'react'

import './card.styles.scss'


const Card = ({id, click}) => 
{
  
    return (
    
    <div className = "card">
       <div className="container">
           <img id={id} onClick={click} alt={`monster${id}`}src={`https://robohash.org/${id}?set=set5&size=150x150`}/>
       </div>
    </div>
    );
};
export default Card;