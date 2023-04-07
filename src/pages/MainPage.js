import { profileUser } from "../api/ProfileClient";
import { getAllGames, joinGame, createGame } from "../api/GamesClient";
import { useEffect, useState, useRef } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "../component/Header";

export default function MainPage({ setToken, setGameId }) {
  const [profile, setProfile] = useState(null);
  const [games, setGames] = useState([]);
  const navigate = useNavigate();
  const interval = useRef(null);
  console.log(games);
  console.log(profile);
  useEffect(() => {
    const loadData = async () => {
      try {
        let res = await profileUser();
        setProfile(res);
      } catch (error) {
        console.log(error);
      }
      try {
        let res = await getAllGames();
        setGames(res);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
    interval.current = setInterval(loadData, 50000);

    return () => {
      clearInterval(interval.current);
    };
  }, []);

  function handleJoinGame(e, gameId) {
    e.preventDefault();
    sessionStorage.setItem("gameId", gameId);
    joinGame(gameId).then((e) => setGameId(gameId));
    navigate("/game");
  }
  function handleCreateGame(e) {
    e.preventDefault();

    let resp = async () => {
      try {
        let r = await createGame();
        setGameId(r.id);
        navigate("/game");
      } catch (error) {
        console.log(error);
      }
    };
    resp();
  }
  function handleLogout(e) {
    e.preventDefault();
    console.log("Logout");
    sessionStorage.removeItem("token");
    setToken(null);
  }
  return (
    <Container>
      {profile && (
        <Row className={"mt-4"}>
          <Col>
            <h1>Main Page</h1>
          </Col>
          <Col>
            <Row>
              <Col>
                <Header profile={profile} action={(e) => handleLogout(e)} />
              </Col>
            </Row>
          </Col>
        </Row>
      )}
      <Row>
        <Col>
          <Row>
            <Col>
              <Table striped="columns" bordered hover>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Player 1</th>
                    <th>Player 2</th>
                    <th>Status</th>
                    <th>
                      <Button
                        className={"btn-success"}
                        type="button"
                        onClick={(e) => handleCreateGame(e)}
                      >
                        Create
                      </Button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {games
                    .filter((g) => g.status !== "FINISHED")
                    .filter(
                      (g) =>
                        g.player1Id === profile.user.id ||
                        g.player2Id === null ||
                        g.player2Id === profile.user.id
                    )
                    .sort((g) => (g.player2Id === profile.user.id ? -1 : 1))
                    .sort((g) => (g.player1Id === profile.user.id ? -1 : 1))
                    .map((game, index) => {
                      return (
                        <tr key={index}>
                          <td>{game.id}</td>
                          <td>{game.player1 ? game.player1.email : " "}</td>
                          <td>{game.player2 ? game.player2.email : " "}</td>
                          <td>{game.status}</td>
                          <td>
                            <Button onClick={(e) => handleJoinGame(e, game.id)}>
                              Join
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
