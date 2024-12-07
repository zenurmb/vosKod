import React, { useState } from 'react'
import { SiBigcartel } from "react-icons/si";
import '../styles/comp.css'
import { TiShoppingCart } from "react-icons/ti";
import { Link, useNavigate } from 'react-router-dom'

export default function Header({state, cartCounter}) {
  const nav = useNavigate()
  const [click, setClick] = useState(0)
  const [value,setValue] = useState('')

    const NAVBAR = [
      {route:'/',name:'Home', counter:''},
      {route:'/products',name:'Products', counter:''},
      {route:'/cart',name: <TiShoppingCart className='cart-logo'/>, counter:cartCounter }
      
    ]
  const [burger,setBurger] = useState(true)
  return (
    <div className='header'>
      <Link to={'/'}><SiBigcartel className='logo'/></Link>
      <input type="text" className='sarach' onChange={(e)=>{
        setValue(e.target.value)
      }}/>
      <nav  className={
        burger === true
        ?"header__menu"
        :"header__menu burgerActive"
      }>
        {
          NAVBAR.map((items,idx)=>{
            return <Link to={items.route} className={click===idx?'activ':''}
            onClick={()=>{setClick(idx)}} > {items.name} <b>{items.counter<1?'':items.counter>9?'9+':items.counter}</b></Link>
          })
        }
      </nav>
      <div className={ value.length===0?'result':'result  result-active'}>

      {
        state.filter(item => item.title.toUpperCase().includes(value.toUpperCase())).map((result)=>{
          return(
            <div key={result.id} onClick={()=>{  
              nav(`/details/${result.id}`) 
              setValue('') 
            }}  className="result__items">
              <img src={result.images[0]} alt="" />
              <h2>{result.title}</h2>
            </div>
          )
        })
      }
      </div>
      <button onClick={()=>{  
        burger===true
        ?setBurger(false)
        :setBurger(true)

      }} className={
        burger===true
        ?"burger"
        :"burger burgerKrest"
      }>
        <span></span>
        <span></span>
      </button>
      
    </div>
  )
}
