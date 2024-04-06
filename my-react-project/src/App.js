import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation  from "./Home/Home";
import Cart from './Cart/Cart'
import AllProducts from "./AllProducts/AllProducts";
import { useState } from 'react';
function App() {
  const [products,setProducts] = useState({})
  const [cart,setCart] = useState([])
  const[cartCount,setCartCount] = useState(0)
  const [searchText,setSearchText] = useState('')
  const[searchCat,setSearchCat] = useState('All')
  const  getProducts = async (limit=12,skip=0)=>{
    try{
      const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
      const json = await res.json();
      setProducts(json)
      return json.products
    }
    catch(err){
      console.log(err)
    }

    
  }
  return (

    <div className="App">
      <BrowserRouter>
      <Navigation setProducts={setProducts} cart={cart} products={products} cartCount={cartCount} getProducts ={getProducts} searchText={searchText} setSearchText ={setSearchText} setSearchCat={setSearchCat} searchCat={searchCat} />
      <Routes>
        <Route path="/" element={<AllProducts allproducts = {products}  setCart={setCart} cart={cart} setCartCount={setCartCount} getProducts={getProducts} searchText={searchText} searchCat={searchCat}/> } />
        <Route path="/cart"  
         element={<Cart setCartCount={setCartCount} setCart={setCart} cart={cart}/>}
        />
     
      </Routes>
      </BrowserRouter>
      

    </div>
  );
}

export default App;
