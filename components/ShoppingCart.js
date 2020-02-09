import React, { useState, useEffect } from "react";
import "./ShoppingCart.css"

// SERVICES


function ShoppingCart(props){
  const [cart,setcart] = useState(props.cart)

      
  return (
    (props.embedded =="false")?(
    <div className= "shadow text-white m-2 flex-start shopping-cart">
      <div className=" shadow col-12 bg-dark font-md p-2">
        <div className= "float-left mx-2">
           <i  className="fa fa-shopping-cart"></i>
        </div>
        <span className= "float-left mr-auto mx-2">
              Shopping cart:{cart.name}
        </span>
      </div>
      <div className="flex-center bg-light cart-body" >
            {props.render()}
      </div>
      <div className="col-12 bg-dark p-2  shadow-lg font-md">
         <button 
          className= "btn btn-sm btn-success mr-4"
          onClick = {()=>props.onToggle(cart)}
          >
            {props.gostop(cart)}
         </button>
         <button 
          className= "btn btn-sm btn-danger"
          onClick = {()=> props.onRemove(cart)}
        >
            Remove this cart
         </button>
      </div>
    </div>
   ):(
         
  <div className=" shadow  bg-light font-md m-2"
       onClick= {()=>props.onChoose(cart)}>
        <div className= " m-2">
           <i  className="fa fa-shopping-cart"></i>
        </div>
        <span className= "">
              Shopping cart:{cart.name}
        </span>
      </div>
      
   ))
}
    
  

export default ShoppingCart;
