import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import MainPage from './pages/MainPage'
import Cart from './pages/Cart'
import Products from './pages/Products'
import Details from './pages/Details'
import Header from './comp/Header'
import Footer from './comp/Footer'
import React, { useState, useEffect} from 'react'


function App() {
  const [cart , setCart] = useState([]) 
  const [ state, setState ] = useState([]) 
  const [cartCounter,setCartCounter] = useState(0)
 
    function addCart(obj){ 
      const idx = cart.findIndex((item)=>{ 
        return item.id === obj.id 
      })
      if(idx===-1){ 
        setCart([{...obj,count:1},...cart]) 
      }else{ 
        cart[idx].count +=1; 
        setCart([...cart]) 
      } ;
      setCartCounter(cartCounter+1)
    }
    function deleteCart(obj){ 
      const idx = cart.findIndex((item)=>{ 
        return item.id === obj.id 
      })
      if(obj.count>0){ 
        cart[idx].count-=1
        setCart([...cart]) 
      }else{ 
        cart.filter((item)=>{
          return item.id == obj.id
        }) 
        
      } ;
      setCartCounter(cartCounter-1)
    }

  function getData(){
    axios('https://api.escuelajs.co/api/v1/products').then(({data})=>{
        setState(data)
    })
  }

  useEffect(()=>{getData()},[state])
  

  return (
    <BrowserRouter>

      <Header state={state} cartCounter={cartCounter}/>

          <Routes>
            <Route path='/' element={<MainPage/>}/>
            <Route path='/cart' element={<Cart cart={cart} addCart={addCart} deleteCart={deleteCart}/>}/>
            <Route path='/products' element={<Products addCart={addCart} state={state}/>}/>
            <Route path='/details/:id' element={<Details addCart={addCart}/>}/>
          </Routes>

      <Footer/>

    </BrowserRouter>
  )
}

export default App
