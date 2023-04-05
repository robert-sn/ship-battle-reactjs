import { useState } from "react";
import { registerUser } from "../api/AuthenticationClient";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit() {
    let req = {
      email: email,
      password: password,
    };
    console.log(JSON.stringify(req));
    try {
      const resp = await registerUser(JSON.stringify(req));
      console.log(resp);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Container>
        <Row className="justify-content-md-center">
          <Col xl={4}>
            <Row>
              <Col>
                <h1>Register Page</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form>
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
                  <Button type="button" onClick={handleSubmit}>
                    Register
                  </Button>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col>
                <Link to="/">Login</Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
