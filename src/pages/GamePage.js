import { useState, useEffect } from "react";
import { profileUser } from "../api/ProfileClient";
import { getGameById } from "../api/GamesClient";
import { useNavigate } from "react-router-dom";
import GameBoard from "../component/GameBoard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "../component/Header";
import Stack from "react-bootstrap/Stack";

export default function GamePage() {
  const [game, setGame] = useState(null);
  const [profile, setProfile] = useState(null);
  const [state, setState] = useState("");
  const navigate = useNavigate();
  const interval = useState(null);
  // console.log(game);

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

    interval.current = setInterval(loadData, 2000);

    return () => {
      clearInterval(interval.current);
    };
  }, [interval]);

  function handleExit(e) {
    e.preventDefault();
    sessionStorage.removeItem("gameId");
    navigate("/");
  }

  return (
    <Container>
      {profile && (
        <Row className={"mt-4"}>
          <Col>
            {game && (
              <Stack gap={2}>
                <h1>Game Page</h1>
                <div>
                  <span className={"mx-2"}>Status:</span>
                  <span className={"mx-2"}>{game?.status}</span>
                </div>
                <div>
                  <span className={"mx-2"}>Next to move:</span>
                  <span variant="outline-success">
                    {game && game?.playerToMoveId === game?.player1Id
                      ? game.player1?.email
                      : game.player2?.email}
                  </span>
                </div>
              </Stack>
            )}
          </Col>
          <Col>
            <Row>
              <Col>
                <Header profile={profile} action={(e) => handleExit(e)} />
              </Col>
            </Row>
          </Col>
        </Row>
      )}

      <Row>{game && <Col></Col>}</Row>
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
