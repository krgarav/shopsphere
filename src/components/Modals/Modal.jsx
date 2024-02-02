import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, ListGroup, Image } from "react-bootstrap";
import { cartAction } from "../../store/cart-slice";

function Cartmodal(props) {
  const itemsInCart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  let totalPrice = itemsInCart.reduce((accumulator, item) => accumulator + +item[0].price, 0);

  const removeHandler = (id) => {
    const filteredItem = itemsInCart.filter((item) => item[0].id !== id);
    dispatch(cartAction.removeFromCart(filteredItem));
  };
  console.log(totalPrice)
  const allItems = itemsInCart.map((item) => {
    return (
      <ListGroup.Item key={item[0].title}>
        <Container>
          <Row>
            <Col>
              <Image src={item[0].thumbnail} thumbnail />
              <p>{item[0].title}</p>
            </Col>
            <Col>
              <p> {item[0].price}</p>
            </Col>
            <Col>
              <input
                type="number"
                min="1"
                max="5"
                // value={item.quantity}
                readOnly
              />
              <Button
                variant="danger"
                onClick={() => removeHandler(item[0].id)}
              >
                Remove
              </Button>
            </Col>
          </Row>
        </Container>
      </ListGroup.Item>
    );
  });
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <h2>ITEM</h2>
              </Col>
              <Col>
                <h2>Price</h2>
              </Col>
              <Col>
                <h2>Quantity</h2>
              </Col>
            </Row>
          </Container>
          <ListGroup as="ul">{allItems}</ListGroup>
          <Container className="text-end">
            <h3>
              Total <span>: Rs {totalPrice} /-</span>
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
