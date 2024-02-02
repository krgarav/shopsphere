import { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import axios from "axios";
import NavBar from "../../components/Navbar/Navbar";
import classes from "./Product.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../../store/cart-slice";
const Product = () => {
  const [products, setProducts] = useState([]);
  const itemsInCart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get("https://dummyjson.com/products?limit=10");
      setProducts(res.data.products);
    };
    fetchdata();
  }, []);
  console.log(itemsInCart);
  const addToCartHandler = (id) => {
    const element = products.filter((item) => item.id === id);
    console.log(element);
    dispatch(cartAction.addToCart(element));
    console.log(id);
  };

  const allProducts = products.map((item) => (
    <Col key={item.title} xl={4} className={classes.productContainer}>
      <h3>{item.title}</h3>
      <img
        src={item.thumbnail}
        alt={Image.title}
        width="300px"
        height="200px"
      />
      <div className={classes.price}>
        <span>Rs {item.price}/-</span>
        <span>
          <Button variant="info" onClick={() => addToCartHandler(item.id)}>
            Add to Cart
          </Button>
        </span>
      </div>
    </Col>
  ));

  return (
    <Fragment>
      <NavBar />
      <div
        style={{
          backgroundColor: "grey",
          height: "100px",
          textAlign: "center",
          fontSize: "20px",
        }}
      >
        <h1 style={{ fontSize: "80px" }}>Shop Sphere</h1>
      </div>
      <br />
      <Container className="text-center">
        <Row>{allProducts}</Row>
      </Container>
    </Fragment>
  );
};
export default Product;
