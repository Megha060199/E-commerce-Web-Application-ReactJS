import React   from "react";
import template from "./Home.jsx";


import logo from '../logo.svg';
import '../App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useEffect,useState } from 'react';
import AllProducts from '../AllProducts/AllProducts.js'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AiOutlineSearch } from "react-icons/ai";
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom';

function Navigation({setProducts,cart,products,cartCount,getProducts,searchText,setSearchText,searchCat,setSearchCat}) {
 
  // const [products,setProducts] = useState({})
  
  const [productCategory,setProductCategory] = useState([])
  
  const[searchedProductCat,setSearchedProductCat] = useState([])

  useEffect(()=>{
    console.log(cart,'check-cart')
   getProducts(12,0)
   getProductCategories()
  
  },[cart])
 

  const getProductCategories =async()=>{
    try{
      const res = await fetch('https://dummyjson.com/products/categories');
      const json = await res.json();
      setProductCategory(json)
    }
    catch(err){
      console.log(err)
    }
    

  }
  const handleCategoryChange = async (category)=>{
    setSearchCat(category)
    if (!searchText)
    {
      var categories = await getCategoryProduct(category)
      await setProducts({'products':categories})

    }
    else
    {
      await getCategoryProduct(category)
      await handleSearch('',category)
    }
   
  }
  const getCategoryProduct =async  (category)=>{
    console.log(category,'checkkkk')
    const res = await fetch(`https://dummyjson.com/products/category/${category}`)
    const json = await res.json()
    setSearchedProductCat(json.products)
    return json.products
  }
  const handleSearchText = (event)=>{
    setSearchText(event.target.value)
  }
  const handleSearch = async (event,category='')=>{
    console.log(searchCat,category,'category')
    // console.log(category,'check-cat')
    if (!searchText)
    {
      getProducts(12,0)
    }

   
    else
    {
    const res = await fetch(`https://dummyjson.com/products/search?q=${searchText}`);
    const json = await res.json();
    
    if (category!='')
    {
      if (category!='All' && category!='all' && searchedProductCat && json)
      {
      var categories = await getCategoryProduct(category)
     
      var idArray =  await categories.map(item=> {return item.id })
      const filteredProducts = json.products.filter(item=>idArray.includes(item.id))
      console.log(json,filteredProducts,'check-filtered')
       await setProducts({'products':filteredProducts})
      }
      else{
        setProducts(json)
      }
    }
    else
    {
      console.log('inside-else')
      console.log(searchCat,'check')
      if(searchCat == 'All' || searchCat == 'all')
      {
        setProducts(json)
      }
      else
      {
        var idArray = searchedProductCat.map(item=> {return item.id })
        const filteredProducts = json.products.filter(item=>idArray.includes(item.id))
        console.log(json,filteredProducts,'check-filtered')
         setProducts({'products':filteredProducts})
      }
   
    }
  }
  }
  const handleKeyPress = (event)=>{
    console.log(event.keyCode,'check-event')
    if (event.keyCode === 13) {
      if(event.target.value=='' && searchCat!='All' && searchCat!=='all')
      {
        handleCategoryChange()
      }
      else if(event.target.value=='' && (searchCat =='All' || searchCat =='all'))
      {
        getProducts(12,0)
      }
      else
      {
      handleSearch()
      }
    }
   setSearchText(event.target.value)
  
  }
   
    
  // }

  const handleHomeClick = ()=>{
    
    console.log('calleddd')
    
    setSearchCat('')
    getProducts()
  }
  return (
    <div className="App">
          <Navbar collapseOnSelect expand="lg" bg="primary"  >
        {/* <Navbar.Brand className='m-2 color-white' href="/">InnoCaption</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className='d-flex align-items-center'>
         <Link className='m-3 color-white' to={{'pathname':"/" }} onClick={handleHomeClick}> Home</Link>
          </Nav>
        <Form onSubmit={(e) => e.preventDefault()} >
        <Row>
        
          <InputGroup className="m-2" style={{width:'300px'}}>
          <Form.Select  className= "select-form"
          onChange={(e)=>handleCategoryChange(e.target.value)}
          >
      
      <option value="all">All</option>
      {productCategory.map(category =>
      <option value={category}>{category}</option>
      )
      
      }
    </Form.Select>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          type="text"
              placeholder="Search a product"
              className= "mr-sm-2 input-focus-style"
              bg="primary"
              value={searchText}
              onChange={(e)=>setSearchText(e.target.value)}
              onBlur={handleSearchText}
              style={{'width':'50%'}}
              onKeyDown={handleKeyPress}
              
        />
          <InputGroup.Text style={{'width':'10%'}}  id="inputGroup-sizing-default">
        <a onClick={handleSearch}><AiOutlineSearch /></a>
        </InputGroup.Text>
      </InputGroup>

          </Row>
          </Form>
       
          <Nav className="me-auto">
            
          </Nav>
          <Nav className='d-flex align-items-center position'>
         <Link className='margin color-white ' to="/cart" state={{'cart':cart}}> 
        <AiOutlineShoppingCart style={{ fontSize: '40px', color: 'white' }}>
          </AiOutlineShoppingCart>
          {cartCount > 0 && <span className="badge"> {cartCount} </span> }
           </Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  

    </div>
  );
}

export default Navigation;

