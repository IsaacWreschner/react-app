import React, { useState, useEffect,useMemo } from "react";
import NavBar from "./Components/NavBar";
import Product from "./Components/Product";
import ShoppingCart from "./Components/ShoppingCart"
import Modal from "./Components/Modal"
import "./App.css"
// SERVICES
import productService from './services/productService';
import shoppingCartsService from './services/ShoppingCarts'
 


function App() {
  const [products, setproducts] = useState(null);
  const [shoppingCarts,setshoppingCarts] = useState(null)
  const [displayShoppC,setdisplayShoppC] = useState(false);
  const [defaultCart,setdefaultCart] = useState(null);
  const [modalheader,setmodalheader] = useState(['',()=>{}])

  useEffect(() => {
    if(!products) {
      getProducts();
    }
    if(!shoppingCarts ){
      getShoppingCarts()
    }
  })

 
  const getProducts = async () => {
    let res = await productService.getAll();
    console.log(res);
    setproducts(res);
  }

  const getShoppingCarts = async () => {
    let res = await shoppingCartsService.getAll();
    console.log(res);
    setshoppingCarts(res);
  }




  const handleAddCart = () =>{
    let tmp = [...shoppingCarts]
    tmp.push({
     "id":"",
     "items":[],
     "name":""
   }) 
    setshoppingCarts(shoppingCarts=>tmp )



  }
  const handleBuy = (product,amount)=>{
    if(!defaultCart){
      document.getElementById('modal').style.display = "block";
      let cart = shoppingCarts.pop();
      setmodalheader(["Buy",()=>{
        if(!shoppingCarts){
          return "you don't have have shopping carts"
        }
        else{
        return shoppingCarts.map(cart =>{
          return <div className="flex-center">
                    {shoppingCart(cart,"true",()=>{})}
                </div>
            })
          }
        }])
      }
      if(defaultCart){
        let tmp = [...shoppingCarts]
        tmp.find(cart => cart._id == defaultCart._id).items.push({id:product._id,amount:amount})
        setshoppingCarts(tmp);
        console.log(shoppingCarts)
      }
  }
 
      
      
  const handleToggleCart = (cart)=>{
    if(defaultCart == cart){
      setdefaultCart (null);
    }
    else{
      setdefaultCart( cart);
    }
  }

  const gostop = (cart)=>{
    if(defaultCart == cart){
      return 'stop';
    }
    else{
      return 'go';
    }
  }
  
  

  const handleRemoveProduct = (product,parentCartId)=>{
    console.log(product)
      let tmp = [...shoppingCarts]
        tmp.map(cart => {
          if(cart._id == parentCartId)
          cart.items = cart.items.filter(prodct => prodct.id != product._id);
        })
        setshoppingCarts(tmp)
  }

  const handleRemoveCart = (cart) =>{
        setshoppingCarts(shoppingCarts.filter(spCart => spCart!= cart))
      }
      

  const navBar = ()=>{
    return( 
    <NavBar 
      amount = '4'
      onAdd = {()=> handleAddCart()}
      toggle = {()=>(
        (displayShoppC)?(
          setdisplayShoppC(false) 
        ):(
          setdisplayShoppC(true))
        )}
    ></NavBar>);
  }

  
  const shoppingCart = (cart,embedded = "false",onChoose = null)=>{
    return(
    <ShoppingCart 
      key = {cart._id+embedded}
      cart = {cart}
      onToggle = {(cart)=>handleToggleCart(cart)}
      onChoose = {onChoose}
      gostop = {(cart)=>gostop(cart)}
      onRemove = {(cart)=>handleRemoveCart(cart)}
      embedded = {embedded}
      render = {()=>(cart.items.map((item,index) =>{
        var product = products.find(product => product._id == item.id);
        if(product)
          return( 
          <Product 
            key = {cart._id + product._id + index} 
            product = {product}
            onRemove = {(product,parentCartId)=> handleRemoveProduct(product,parentCartId)}
            amount={item.amount}
            embedded = "true"
            parentCartId = {cart._id}
          ></Product>)
      }))}
    ></ShoppingCart>)
  }


  

  return (
    <div id = "a" className="App">
      {navBar()}
      <div className="flex-center">
        {(displayShoppC == false) ? (
          (products && products.length > 0) ? (
            products.map(product => {
              return( 
              <Product key= {product._id} 
                product={product} 
                onBuy = {(product,amount)=>handleBuy(product,amount)} 
              ></Product>)
            })
          ):(
            <div className = "flex-center col-12  font-lg m-1 no-found">
              <p>No product found</p>
            </div>
        )):(
          (shoppingCarts && shoppingCarts.length > 0 ) ?(
            shoppingCarts.map(cart =>{
              return shoppingCart(cart);
            })
          ):(
            <div className = "flex-center col-12 font-lg m-1 no-found">
              <p>No shopping cart found</p>
            </div>
        ))}
      </div>
      <Modal key="modal"  header = {modalheader[0]} content = {modalheader[1]}></Modal>
    </div>
  );
}
export default App;
