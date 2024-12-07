import React from 'react'
import '../styles/comp.css'
import '../styles/pages.css'


export default function Cart({cart,addCart,deleteCart}) {
  return (
    <div className='main'>
      
        <div className="cartParent">

          {
              
            cart.map((item)=>{
            if(item.count>0){
              return(
                <div className="cart-items">
                  <img key={item.id} src={item.images[0]} alt="" />
                  <div className="cart-content">
                    <h2>{item.title}</h2>
                    <span>
                    <b>count:{item.count}</b>
                    <b>{item.category.name}</b>
                    </span>
                    <i>${item.price * item.count}</i>
                    <span>
                      <button onClick={()=>{
                        addCart(item)
                      }}>+</button>
                      <button onClick={()=>{
                        deleteCart(item)
                      }}>-</button>
                    </span>
                  </div>
                </div>
                
              )
            }
            })
          }
          <div className="total">
            <h2>TOTAL:</h2>
            {
                cart.reduce((acc, item)=>{
                    return acc + (item.price * item.count) 
                },0)
            }$
        </div>

        </div>
      
    

    </div>
  )
}
