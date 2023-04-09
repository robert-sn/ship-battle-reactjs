import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Stack from "react-bootstrap/Stack";

export default function Header({ profile, action }) {
  return (
    <Row>
      <Col>
        <Row>
          <Col>
            <Stack direction="horizontal">
              <h2>{profile && <span>{profile.user.email}</span>}</h2>
              <Button className="ms-auto" onClick={(e) => action(e)}>
                Exit
              </Button>
            </Stack>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped="columns" bordered hover>
              <tbody>
                <tr>
                  <td style={{ fontWeight: "bold" }}>
                    Currently playing Games
                  </td>
                  <td>{profile.currentlyGamesPlaying}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>Game won</td>
                  <td>{profile.gamesWon}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>Game lost</td>
                  <td>{profile.gamesLost}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>Game played</td>
                  <td>{profile.gamesPlayed}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
