import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

import Rating from "@mui/material/Rating";
import ProductBody from "../../components/ProductBody/ProductBody";
const ProductDetail = (props) => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const currentPageProducts = useSelector(
    (state) => state.cart.currentPageProducts
  );
  // console.log(currentPageProducts[id])
  useEffect(() => {
    const prdt = currentPageProducts[id];
    console.log(prdt);
    setProduct([prdt]);
  }, [currentPageProducts]);
  useEffect(() => {
    
  }, [currentPageProducts]);

  return (
    <>
      {product.length > 0 && (
        <Container>
          <Row>
            <Col>
              <div>
                <img src={product[0].images[3]} width={400} height={300} />
              </div>
              <div>
                <img src={product[0].images[0]} width={50} height={50} />
                <img src={product[0].images[1]} width={50} height={50} />
                <img src={product[0].images[2]} width={50} height={50} />
                <img src={product[0].images[3]} width={50} height={50} />
              </div>
            </Col>
            <Col>
              <h3>{product[0].title}</h3>
              <h2>Rs {product[0].price}.00</h2>
              <Rating name="disabled" value={4} disabled />
              <h6>Brand : {product[0].brand}</h6>
              <h6>Rating : {product[0].rating}</h6>
              <h6>Weight : 228 gm</h6>
              <h6>Variant : Space grey ,Jet Black , Off White</h6>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button startIcon={<LocalShippingIcon />}> Free Shipping </Button>
              <Button startIcon={<VerifiedIcon />}> 100% Verified </Button>
              <Button startIcon={<EventAvailableIcon />}>
                Return Available
              </Button>
            </Col>
            <Col>
              <input type="button" value="-" />
              <span>1</span>
              <input type="button" value="-" />
            </Col>
            <Col>
              <Button variant="contained">Buy now</Button>
              <Button variant="outlined" startIcon={<AddShoppingCartIcon />}>
                Add to cart
              </Button>
            </Col>
          </Row>
          <Row>
            <ProductBody item={product[0]} />
          </Row>
          <hr />
          <h4>Related Products</h4>
          <Row></Row>
        </Container>
      )}
      {product.length === 0 && <h1>product handled</h1>}
    </>
  );
};

export default ProductDetail;
