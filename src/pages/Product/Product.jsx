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
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import ProductBlock from "../../components/ProductBlock/ProductBlock";
const Product = () => {
  const [products, setProducts] = useState([]);
  const itemsInCart = useSelector((state) => state.cart.cartItems);
  const currentPageProducts = useSelector(
    (state) => state.cart.currentPageProducts
  );

  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get("https://dummyjson.com/products?limit=10");
      dispatch(cartAction.addToCurrentPageProduct(res.data.products));
    };
    fetchdata();
  }, [page]);
  const addToCartHandler = (index, event) => {
    event.stopPropagation();

    dispatch(cartAction.addToCart(index));
  };
  const handleChange = (event, value) => {
    setPage(value);
  };
  const handleProduct = (index) => {
    navigate("/product/" + index);
  };
  const allProducts = currentPageProducts.map((item, index) => {
    return (
      <Col
        key={item.title}
        xs={12}
        md={6}
        lg={4}
        xl={3}
        className={classes.productContainer}
        onClick={() => handleProduct(index)}
        style={{ textAlign: "start" }}
      >
        <Card>
          <CardMedia
            component="img"
            alt="prdt"
            height="200"
            image={item.thumbnail}
            style={{ objectFit: "fill" }}
          />
          <CardContent>
            <Row>
              <Typography>{item.brand}</Typography>
            </Row>
            <Row style={{ maxHeight: "50px", overflow: "hidden" }}>
              <Typography gutterBottom variant="h7" component="div">
                <span className={classes.title}>
                  {capitalizeFirstLetter(item.title)}
                </span>
              </Typography>
            </Row>
            <Row>
              <div style={{ display: "flex", flexDirection: "row" ,marginBottom:"10px"}}>
                <Rating name="disabled" value={item.rating} disabled />
                <Typography color="text.secondary">
                  ({Math.floor(item.rating * 100)})
                </Typography>
              </div>
            </Row>
            <Typography variant="body" color="text.bold">
            ₹ {item.price}/-
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="large"
              variant="contained"
              onClick={(event) => addToCartHandler(index, event)}
              style={{ width: "100%" }}
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
      <div className={classes.header}>
        <Header />
        <Container className={`text-center `}>
          <ImageHeader />
          <br />
          <br />
          <br />
          <Row>{allProducts}</Row>
        </Container>
        <div className={classes.pagination_container}>
          <Pagination count={100} page={page} onChange={handleChange} />
        </div>
        <ProductBlock/>
      </div>
    </Fragment>
  );
};
export default Product;
