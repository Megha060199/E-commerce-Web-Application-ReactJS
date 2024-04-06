import React    from "react";
import template from "./Cart.jsx";
import { useEffect,useState} from "react";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/esm/Col.js";
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

function Cart({cartItems,setCartCount,setCart,cart}) {
  const [cartTotal,setCartTotal] = useState([])
  
  useEffect(()=>{

    var cartItemsTotal = 0
    cart.map(cartItem=>{
      cartItemsTotal+=cartItem.total

    })
    setCartTotal(cartItemsTotal)

  },[cart])

  const getCart = async()=>{
    const res = await fetch('https://dummyjson.com/carts/1')
    const json = await res.json()
    setCart(json.products)
  }
  const onQuantityChange = (val, item) => {
    var totalItemCount = 0
    if (val)
    {
      
      const updatedItems = cart.map(cartItem => {
        if (cartItem.id === item.id) {
          var currentItemTotal = val*item.price
          return { ...cartItem, quantity: val, total:currentItemTotal };
        }
        return cartItem;
      });
      setCart(updatedItems)

      updatedItems.map(item => {
        totalItemCount +=  item.quantity
      }
        )
      setCartCount(totalItemCount)
     
    }
    else{
      cartItems =  cart.filter(cartItem => cartItem.id !== item.id);
      console.log(cartItems)
      setCart(cartItems)
      cartItems.map(item => {
        totalItemCount +=  item.quantity
      }
        )
        
        setCartCount(totalItemCount)
       
  

    }

    

  };
  const handleDelete =(item)=>{
    var totalItemCount = 0
    var cartItems =  cart.filter(cartItem => cartItem.id !== item.id);
    setCart(cartItems)
    cartItems.map(item => {
      totalItemCount +=  item.quantity
    }
      )
    setCartCount(totalItemCount)
    // setcart(cartItems);
    }


  return (
    <div className="cart">


      <Container>
  
      <div className="my-4 shopping-cart-header" >
      <h2 >Shopping Cart</h2>
      </div>
    

  {cart && cart.map((item) => (

    <>
   <Card.Body key = {item.id} className="card-body">
   
    
 
    <div>

<Row>
<Col md={3}>
<div>
  <Image className="cart-image"    src={item.thumbnail} rounded />
        </div>
  </Col>
  <Col md={3}>
  <Card.Title >{item.title} </Card.Title>
  <InputGroup style = {{'width':'50%'}} >
  
  <InputGroup.Text id="inputGroup-sizing-default">
      Qty:
      </InputGroup.Text>
<Form.Control 
  type="number" 
  value={item.quantity} 
  
  onChange={(e) => onQuantityChange(parseInt(e.target.value),item)} 
  min="0" 
/>

</InputGroup>
<Card.Text className="text-style">Qty total: ${item.total} | <a style={{'color':'blue'}} href = "#" onClick={()=>handleDelete(item)} > Delete Item</a></Card.Text>
  </Col>
 
  <Col md = {5}>
  </Col>

</Row>

</div>
      


</Card.Body>
<hr/>
</>

  ))}
 



{cart.length>0? <p>Cart Total : {cartTotal}</p> : <p className="d-flex justify-content-center align-items-center" style = {{"height":'80vh'}}> Nothing in Cart</p>}
</Container>
    </div>
  );
};

export default Cart;
