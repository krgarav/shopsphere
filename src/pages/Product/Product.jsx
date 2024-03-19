import { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import axios from "axios";
import classes from "./Product.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../../store/cart-slice";
import Header from "../../components/Header/Header";
import capitalizeFirstLetter from "capitalize-first-letter";
import { Card, CardActions, CardContent, CardMedia } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ImageHeader from "../../components/ImageHeader/ImageHeader";
import Pagination from "@mui/material/Pagination";
const Product = () => {
  const [products, setProducts] = useState([]);
  const itemsInCart = useSelector((state) => state.cart.cartItems);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get("https://dummyjson.com/products?limit=10");
      setProducts(res.data.products);
    };
    fetchdata();
  }, [page]);
  const addToCartHandler = (id) => {
    const element = products.filter((item) => item.id === id);
    dispatch(cartAction.addToCart(element));
  };

  const handleChange = (event, value) => {
    console.log(value);
    setPage(value);
  };
  const allProducts = products.map((item) => {
    return (
      <Col
        key={item.title}
        xs={12}
        md={6}
        lg={4}
        xl={3}
        className={classes.productContainer}
      >
        <Card>
          <CardMedia
            component="img"
            alt="prdt"
            height="200"
            image-contain
            image={item.thumbnail}
            style={{ objectFit: "fill" }}
          />
          <CardContent>
            <Typography>{item.brand}</Typography>
            <Typography gutterBottom variant="h4" component="div">
              <span className={classes.title}>
                {" "}
                {capitalizeFirstLetter(item.title)}
              </span>
            </Typography>
            <Typography>{item.rating}</Typography>
            <Typography variant="body" color="text.secondary">
              Rs {item.price}/-
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="large"
              variant="contained"
              onClick={() => addToCartHandler(item.id)}
            >
              Add To Cart
            </Button>
          </CardActions>
        </Card>
      </Col>
    );
  });

  return (
    <Fragment>
      <Header />
      <Container className="text-center">
        <ImageHeader />
        <br />
        <br />
        <br />
        <Row>{allProducts}</Row>
      </Container>
      <Pagination count={100} page={page} onChange={handleChange} />
    </Fragment>
  );
};
export default Product;
