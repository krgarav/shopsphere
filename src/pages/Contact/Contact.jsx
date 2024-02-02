import React, { useRef } from "react";
import NavBar from "../../components/Navbar/Navbar";
import { Form, Button, Container } from "react-bootstrap";
const Contact = () => {
  const namerRef = useRef("");
  const emailRef = useRef("");
  const phoneRef = useRef("");

  const submitHandler = async (event) => {
    event.preventDefault();
    const details = {
      name: namerRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
    };
    const response = await fetch(
      "https://ecommerse-f1258-default-rtdb.firebaseio.com/userdata.json",
      {
        method: "POST",
        body: JSON.stringify(details),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    alert("Thanks For contacting");
    namerRef.current.value = "";
    emailRef.current.value = "";
    phoneRef.current.value = "";
  };
  return (
    <>
      <NavBar />
      <br />
      <Container>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" ref={namerRef} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              ref={emailRef}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Phone number</Form.Label>
            <Form.Control type="tel" placeholder="phoneNumber" ref={phoneRef} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
     
    </>
  );
};
export default Contact;
