import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, ListGroup, Image } from "react-bootstrap";
import { cartAction } from "../../store/cart-slice";
import { useState } from "react";
import classes from "./Modal.module.css";
function Cartmodal(props) {
  const itemsInCart = useSelector((state) => state.cart.cartItems);
  const [enteredQty, setEnteredQty] = useState(1);

  const dispatch = useDispatch();
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const removeHandler = (id) => {
    const filteredItem = itemsInCart.filter((item) => item[0].id !== id);
    dispatch(cartAction.removeFromCart(filteredItem));
  };
  const allItems = itemsInCart.map((item) => {
    const totalPrice = +item[0].price * enteredQty;
    return (
      <div className={classes.listItem}>
        <ListGroup.Item key={item[0].title}>
          <Container>
            <Row>
              <Col>
                <Image src={item[0].thumbnail} thumbnail />
                <p>{item[0].title}</p>
              </Col>
              <Col>
                <p> Rs {item[0].price}.00</p>
              </Col>
              <Col>
                <div>
                  <button
                    onClick={() =>
                      setEnteredQty((prev) => (prev !== 0 ? prev - 1 : prev))
                    }
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={enteredQty}
                    readOnly
                  />
                  <button onClick={() => setEnteredQty((prev) => prev + 1)}>
                    +
                  </button>
                </div>
              </Col>
              <Col>
                {totalPrice}
                <div className={classes.deletebtn}>
                  <Button
                    variant="danger"
                    onClick={() => removeHandler(item[0].id)}
                  >
                    Remove
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
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
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <h4>Product</h4>
              </Col>
              <Col>
                <h4>Price</h4>
              </Col>
              <Col>
                <h4>Qty</h4>
              </Col>
              <Col>
                <h4>Total</h4>
              </Col>
            </Row>
          </Container>
          <ListGroup as="ul">{allItems}</ListGroup>
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
