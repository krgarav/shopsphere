import React, { useContext, useState } from "react";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import classes from "./Navbar.module.css";
import Cartmodal from "../Modals/Modal";
import { useDispatch, useSelector } from "react-redux";
const NavBar = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const itemsInCart = useSelector((state) => state.cart.cartItems);
  const logoutHandler = () => {
    alert("Are you sure you want to logout?");
    navigate("/", { replace: true });
  };
  const cartHandler = () => {
    setShow((prev) => !prev);
  };
  const handleCartClose = () => {
    setShow(false);
  };
  return (
    <Navbar
      bg="black"
      variant="dark"
      style={{ position: "sticky", top: 0, height: "50px", zIndex: "1" }}
    >
      <Container className="justify-content-start">
        <Nav>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/product">
              Home
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link as={NavLink} to="/contact">
              Contact us
            </Nav.Link>
          </Nav.Item>
          <Nav.Item style={{ float: "right" }}>
            <Button variant="danger" onClick={logoutHandler}>
              {" "}
              Logout
            </Button>
          </Nav.Item>
        </Nav>
        <span className={classes.cartbtn} onClick={cartHandler}>
          Cart <span style={{ color: "yellow" }}>{itemsInCart.length}</span>{" "}
        </span>
      </Container>
      <Cartmodal show={show} handleClose={handleCartClose} />
    </Navbar>
  );
};

export default NavBar;
