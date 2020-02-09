import React, { useState, useEffect } from "react";
import "./Product.css"
import ReactDOM from 'react-dom';
import Modal from "./Modal";
import Moodal from "./Modal"

// SERVICES


function Product(props) {
  const [product, setproduct] = useState(props.product);
  var [amount,setamount] = useState((props.amount)?(props.amount):(1))
  var [isEmbedded,setisembedded] = useState((props.embedded == "true")?(true):(false))
  var Modal = null;
 

  useEffect(() => {
    if(!product) {
      setproduct(props.product)
    }
  })
    
  function incremente(){
    if (amount < 50) 
      setamount(amount+1);
    }

  function decremente (){
    if (amount > 1) 
      setamount(amount-1);
    }

  

  return (
    <div  className={
      (isEmbedded)?
        ("embedded bg-light product shadow"
      ):(
        "bg-light product shadow")}
    >
      <h3 className="font-lg text-info mx-3 pt-2">
            {product.name}
      </h3>
      <p className="font-md text-secondary mx-3 pt-2">
            {product.description}
      </p>
      <div className="flex-center text-secondary">
        <button 
         className = "btn btn-success btn-sm mr-3"

         onClick = {
             (!isEmbedded)?
             (()=>props.onBuy(product,amount)
             ):(
                 ()=>props.onRemove(product,props.parentCartId))
         }
        >
                {(!isEmbedded)? ("Buy"):("Remove")}
        </button>
        {(!isEmbedded)?(
          <div>
            <button className = "btn btn-secondary btn-sm" 
              onClick = {()=> incremente()}
            >
              <i className = " fa fa-plus" 
                style={{fontSize:'12px'}}
               />
            </button>
            <span className = "amount mx-2">
                {amount}
            </span>
            <button className = "btn btn-secondary btn-sm" 
              onClick = {()=> decremente()}
            >
              <i className="fa fa-minus" 
                style={{fontSize:'12px'}}
               />
            </button>
          </div>
        ):(
          <span className = "amount mx-2">
                {amount}
          </span>
        )}
      </div>
    </div>
      );
    };
  

export default Product;
