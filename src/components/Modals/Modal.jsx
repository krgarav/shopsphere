import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, ListGroup, Image } from "react-bootstrap";
import { cartAction } from "../../store/cart-slice";
import { useState } from "react";
import classes from "./Modal.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
function Cartmodal(props) {
  const itemsInCart = useSelector((state) => state.cart.cartItems);
  const [enteredQty, setEnteredQty] = useState(1);

  const dispatch = useDispatch();
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const removeHandler = (index) => {
    dispatch(cartAction.removeFromCart(index));
  };

  const allItems = itemsInCart.map((item, index) => {
    const totalPrice = +item.price * item.quantity;
    const incrementHandler = (index) => {
      dispatch(cartAction.incrementCartItem(index));
    };
    const decrementHandler = (index) => {
      if (item.quantity === 1) {
        dispatch(cartAction.removeFromCart(index));
      } else {
        dispatch(cartAction.decrementCartItem(index));
      }
    };

    return (
      <div className={classes.listItem} key={item.title}>
        <ListGroup.Item>
          <Row>
            <Col md={4} lg={4}>
              <Row>
                <Col>
                  <Image src={item.thumbnail} thumbnail />
                </Col>
                <Col>
                  <p className={classes.title}>{item.title}</p>
                </Col>
              </Row>
            </Col>
            <Col md={2} lg={2}>
              <p> Rs {item.price}.00</p>
            </Col>
            <Col md={2} lg={2}>
              <div>
                <button
                  onClick={() => decrementHandler(index)}
                  className={classes.btn}
                >
                  -
                </button>
                <span className={classes.inputBox}>{item.quantity}</span>
                <button
                  className={classes.btn}
                  onClick={() => incrementHandler(index)}
                >
                  +
                </button>
              </div>
            </Col>
            <Col md={2} lg={2}>
              Rs {totalPrice}/-
              <div className={classes.deletebtn}>
                <DeleteIcon
                  className={classes.deleteIcon}
                  style={{ fontSize: "2rem" }}
                  onClick={() => removeHandler(index)}
                />
              </div>
            </Col>
          </Row>
        </ListGroup.Item>
      </div>
    );
  });
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
        fullscreen={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        {allItems.length > 0 && (
          <Modal.Body>
            <Container>
              <Row>
                <Col md={4} lg={4}>
                  <h4>Product</h4>
                </Col>
                <Col md={2} lg={2}>
                  <h4>Price</h4>
                </Col>
                <Col md={2} lg={2}>
                  <h4>Qty</h4>
                </Col>
                <Col md={2} lg={2}>
                  <h4>Total</h4>
                </Col>
              </Row>
            </Container>
            <Container>
              <ListGroup as="ul">{allItems}</ListGroup>
            </Container>

            <Container className="text-end">
              <h3>
                SUB TOTAL{" "}
                <span>
                  : Rs {totalPrice} <small>(exc. shipping fee)</small> /-
                </span>
              </h3>
            </Container>

            {/* cart items */}
          </Modal.Body>
        )}

        {allItems.length===0&&
        <Modal.Body>
          <h1>Your cart is empty</h1>
        </Modal.Body>
        }
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Cartmodal;
