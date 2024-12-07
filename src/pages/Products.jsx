import React, { useState } from 'react' 
import '../styles/pages.css' 
import { useNavigate } from 'react-router-dom'
 
export default function Products({ state, addCart }) { 
  const [filterName, setFilterName] = useState('All') 
  const [filterNumber, setFilterNumber] = useState(0) 
  const navigate = useNavigate()
 
  const FILTERS = [ 
    { id: 1, name: 'All' }, 
    { id: 6, name: 'Clothes' }, 
    { id: 2, name: 'Electronics' }, 
    { id: 3, name: 'Furniture' }, 
    { id: 4, name: 'Shoes' }, 
    { id: 5, name: 'Miscellaneous' }, 
 
  ] 
  return ( 
    <div className='main'> 
      <div className="products"> 
        <div className="products-content"> 
          { 
            filterNumber == 0 
            
              ? state.map((item) => { 
                return ( 
                  <div className="items"> 
                    <img onClick={()=> navigate(`/details/${item.id}`)} src={item.images[0]} alt="" /> 
                    <div className="item-flex"> 
                      <h2> onClick={()=> navigate(`/details/${item.id}`)} { 
 
                        item.title.length > 30 
                          ? item.title.substring(0, 29) + "..." 
                          : item.title 
 
                      }</h2> 
                      <b>{item.category.name}</b> 
                    </div> 
 
                    <p>{ 
                      item.description.length > 90 
                        ? item.description.substring(0, 89) + "..." 
                        : item.description 
                    }</p> 
                    <div className="item-flex"> 
                      <b>${item.price}</b> 
                      <button onClick={()=>{addCart(item)}}>add to cart</button> 
                    </div> 
                  </div> 
                ) 
              
              }) 
              : state.filter(item => item.category.name.includes(filterName)).map((category) => { 
                return ( 
                  <div className="items"> 
                    <img onClick={()=> navigate(`/details/${item.id}`)} src={category.images[0]} alt="" /> 
                    <div className="item-flex"> 
                      <h2 onClick={()=> navigate(`/details/${item.id}`)}>{ 
 
                        category.title.length > 30 
                          ? category.title.substring(0, 29) + "..." 
                          : category.title 
 
                      }</h2> 
                      <b>{category.category.name}</b> 
                    </div> 
 
                    <p>{ 
                      category.description.length > 90 
                        ? category.description.substring(0, 89) + "..." 
                        : category.description 
                    }</p> 
                    <div className="item-flex"> 
                      <b>${category.price}</b> 
                      <button >add to cart</button> 
                    </div> 
                  </div> 
                ) 
              }) 
          } 
        </div> 
 
        <div className="products-filter"> 
 
          <h2>{filterName}</h2> 
          { 
            FILTERS.map((item, idx) => { 
              return <button key={item.id} onClick={() => { 
                setFilterName(item.name) 
                setFilterNumber(idx) 
                console.log(filterNumber); 
              }} className={filterNumber === idx ? 'products_filter-active' : ''}  >{item.name}</button> 
            }) 
          } 
        </div> 
 
      </div> 
    </div> 
  ) 
}
