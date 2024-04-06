import React    from "react";
import template from "./AllProducts.jsx";
import { useEffect,useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Pagination } from 'react-bootstrap';
import "./AllProducts.css";


function AllProducts(props) {
  const [products,setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = 9
  
  useEffect(()=>{
    console.log(props,'check-props')
    if (props.allproducts){
      setProducts(props.allproducts.products)
    }
    
  },[props])

  

  const addToCart = async (item)=>{
    console.log(props.cart,"Before call")
    try{
      const res = await fetch('https://dummyjson.com/carts/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: 1,
      products: [
        {
          id: item.id,
          quantity: 1,
        }
      ]
    })
  })
  const json = await res.json()
  var allproducts = [...props.cart,...json.products]
    props.setCart(allproducts)
    props.setCartCount(allproducts.length)
      }
      catch(err){
        console.log(err,'err')
      }

  }
  const handlePageClick = (page)=>{
    
    setCurrentPage(page)
    props.getProducts(itemsPerPage,((page-1)*itemsPerPage))

  }
  return (
    <div className="all-products">
      
      <Container>
  
      <div className=" d-flex align-items-center justify-content-center m-2">
      <h4> All Products</h4>
      </div>
      <>
         <Row>
         {products && products.map((item) => (
         <Col className="row-spacing"  md={3} sm={6}>
           <Card key = {item.id} style={{ height: '450px', width:'200'}}>
          <div className="image-body">
          <Card.Img  className="fit-image" variant="top" src={item.images[0]}/>
            </div>
          <Card.Body className="card-body">
            <Card.Title style={{maxHeight:'95px',overflow:"hidden",textOverflow:'ellipsis',display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3}}>{item.title} | {item.description}</Card.Title>
    
     <Card.Text>${item.price} |  <span style = {{color:'Red'}}> Get {item.discountPercentage} % Off</span> </Card.Text>
     

     <div className="cart-button">
     <Button onClick={()=>addToCart(item)} variant="primary">Add to cart</Button>
     </div>
  
     
   </Card.Body>
</Card>
         </Col>
         ))}
        
       </Row>

       {(!props.searchText && (!props.setSearchCat!="All" || !props.setSearchCat!="all") && products && products.length>0) && <Pagination className="d-flex justify-content-center align-items-center">
        <Pagination.First 
        onClick={() => handlePageClick(1)} 
        
        />
        <Pagination.Prev 
        
        onClick={() => handlePageClick(currentPage-1)}
        
        />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageClick(index+1)} >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next 
        onClick={() => handlePageClick(currentPage + 1)} 
        />
        <Pagination.Last 
        onClick={() => handlePageClick(totalPages)} 
        />
      </Pagination>}
       </>
       {products && products.length ==0  && 
         <div className="d-flex justify-content-center align-items-center" style={{height:'75vh'}}>
         <p> No Products Found</p>
         </div>}
      </Container>
    
    </div>
  );
};

export default AllProducts;

