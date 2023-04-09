import { useState } from "react";
import { loginUser } from "../api/AuthenticationClient";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default function LoginPage({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    let req = {
      email: email,
      password: password,
    };
    try {
      let resp = await loginUser(JSON.stringify(req));
      setToken(resp.accessToken);
      sessionStorage.setItem("token", resp.accessToken);
      console.log(resp.accessToken);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xl={4}>
          <Row>
            <Col>
              <h1>Login Page</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={handleSubmit} action="/" method="post">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button className="m-2" type="submit">
                  Login
                </Button>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              <Link to="/register">Register</Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
