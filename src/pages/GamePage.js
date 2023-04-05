import { useState, useEffect } from "react";
import { profileUser } from "../api/ProfileClient";
import { getGameById } from "../api/GamesClient";
import GameBoard from "../component/GameBoard";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default function GamePage({ setGameId }) {
  const [game, setGame] = useState(null);
  const [profile, setProfile] = useState(null);
  const [state, setState] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setState("loading");
    let loadData = async () => {
      try {
        const profileRes = await profileUser();
        setProfile(profileRes);

        setState("success");
      } catch (error) {
        setState("error");
      }
      try {
        const gameRes = await getGameById(sessionStorage.getItem("gameId"));
        setGame(gameRes);

        setState("success");
      } catch (error) {
        setState("error");
      }
    };
    loadData();
  }, [setGameId]);

  function handleExit(e) {
    e.preventDefault();
    sessionStorage.removeItem("gameId");
    setGameId(null);
    navigate("/");
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>Game Page</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={(e) => handleExit(e)}>Exit</Button>
        </Col>
      </Row>
      <Row>
        {game && (
          <Col>
            <Row className={"border m-1"}>
              <Col>
                <span className={"mx-2"}>Player1:</span>
                <span className={"mx-2"}>{game.player1.id}</span>
                <span className={"mx-2"}>{game.player1.email}</span>
              </Col>
              <Col className={"text-right"}>
                <Button>Send Config Map</Button>
              </Col>
            </Row>

            <Row className={"border m-1"}>
              <Col>
                <span className={"mx-2"}>Player2:</span>
                <span className={"mx-2"}>{game.player2?.id}</span>
                <span className={"mx-2"}>{game.player2?.email}</span>
              </Col>
              <Col className={"text-right"}>
                <Button>Send Config Map</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <span className={"mx-2"}>Status:</span>
                <span className={"mx-2"}>{game.status}</span>
              </Col>
            </Row>
            <Row>
              <Col>
                <span className={"mx-2"}>Next to move:</span>
                <span>
                  {game.playerToMoveId === game.player1Id
                    ? game.player1.email
                    : game.player2.email}
                </span>
              </Col>
            </Row>
          </Col>
        )}
      </Row>
      <Row>
        <Col>
          {game && profile && <GameBoard game={game} user={profile.user} />}
          {state === "loading" && <h1>Loading...</h1>}
          {state === "error" && <h1>Error loading game data</h1>}
        </Col>
      </Row>
    </Container>
  );
}
