import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import '../styles/comp.css'
import '../styles/pages.css'

export default function Details( {addCart} ) {

  const params = useParams()
  const [details, setDetaills] = useState(null)
  const [click, setClick] = useState(true)
  const [ count, setCount] = useState(0)
  function getDetails(){
    axios(`https://api.escuelajs.co/api/v1/products/${params.id}`)
    .then(({data})=>{setDetaills(data)})
  }
  useEffect(()=>{
    getDetails()
  },[details])
  
  
  return (
    <div className='main'>
        {
          details !== null
          ? <div className="details">
              <div className="details-left">
              <button onClick={()=>{
                count > 0 
                ? setCount(count - 1)
                : setCount(count + 2)
              }}>←</button>
              <img src={details.images[count]} alt="" />
              <button onClick={()=>{
                count < 2
                ? setCount(count + 1)
                : setCount(count - 2)
              }}>→</button>
                
                </div>
             
              <div className="details__content">

                <div className="details-flex1"> 
                  <h2>{details.title}</h2> 
                  <b>{details.category.name}</b> 
                </div> 

                  <p>{details.description}</p> 

                <div className="details-flex"> 
                  <b>${details.price}</b> 
                  <div className="df-btn">
                    <button  className={click===true?'addToCart':''} 
                      onClick={()=>{
                        click===true?setClick(false):setClick(true), addCart(details)
                        }} > add to cart
                    </button>

                    <button id={click===true?'addToCart':'buy'} 
                       >buy</button> 
                  </div>
                </div> 

              </div>
            </div>
          :'Loading...'
        }
    </div>
  )
}