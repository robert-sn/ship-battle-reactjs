import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { strike } from "../api/GamesClient";
import { gameConfigDefault } from "../api/GamesClient";
import { Stack } from "react-bootstrap";
import { leters } from "../model/Leters";

export default function GameBoard({ game, user }) {
  const [matrix, setMatrix] = useState([]);
  const [matrix2, setMatrix2] = useState([]);
  const iAmPlayerOne = game.player1Id === user.id;

  console.log(game);
  // console.log(user);
  useEffect(() => {
    let shipsCoord = game.shipsCoord ? game.shipsCoord : [];
    setMatrix(createCells(shipsCoord, true));
    let moves = game.moves.filter((m) => m.playerId === user.id);
    setMatrix2(createCells(moves, false));

    function createCells(ships, areMyShips) {
      let aux = [];
      for (let i = 0; i < 10; i++) {
        let row = [];
        for (let j = 0; j < 10; j++) {
          let cell = ships.find((s) => s.x === leters[i] && s.y === j + 1);
          if (cell) {
            row.push({
              x: leters[i],
              y: j + 1,
              ship: areMyShips
                ? !cell.hit
                  ? "bg-success"
                  : "bg-danger"
                : cell.result
                ? "bg-success"
                : "bg-warning",
            });
          } else {
            row.push({
              x: leters[i],
              y: j + 1,
              ship: " ",
            });
          }
        }
        aux.push(row);
      }
      return aux;
    }
  }, [game, user]);

  function handleStrike(e) {
    e.preventDefault();
    const selectedX = e.target.getAttribute("x");
    const selectedY = e.target.getAttribute("y");
    const req = {
      x: selectedX,
      y: selectedY,
    };
    console.log(req);
    if (game.status === "ACTIVE") {
      strike(JSON.stringify(req), game.id);
    }
  }

  function handleSendConfigMap(e) {
    e.preventDefault();
    gameConfigDefault(game.id);
  }

  return (
    <Row>
      <Col>
        <Row>
          <Col className={"m-2"}>
            <Row>
              <Col className={"my-2"}>
                <Stack direction="horizontal">
                  <h3>{user.email}</h3>
                  <Button
                    disabled={game.shipsCoord && game.shipsCoord.length}
                    variant="outline-info"
                    className="ms-auto"
                    onClick={(e) => handleSendConfigMap(e)}
                  >
                    Send Config Map
                  </Button>
                </Stack>
              </Col>
            </Row>
            <Row>
              <Col></Col>
              {leters.map((l, i) => {
                return (
                  <Col key={i} className={"cell"}>
                    {l}
                  </Col>
                );
              })}
            </Row>
            {matrix.map((row, i) => {
              return (
                <Row key={i}>
                  <Col className={"cell"}>{i + 1}</Col>
                  {row.map((cell, j) => {
                    return <Col className={`cell ${cell.ship}`} key={j}></Col>;
                  })}
                </Row>
              );
            })}
          </Col>
          <Col className={"m-2"}>
            <Row>
              <Col className={"my-2"}>
                <h3>
                  {iAmPlayerOne
                    ? game.player2 !== null
                      ? game.player2.email
                      : "No player"
                    : game.player1.email}
                </h3>
              </Col>
            </Row>
            <Row>
              <Col></Col>
              {matrix2.map((m, i) => {
                return (
                  <Col key={i} className={"cell"}>
                    {leters[i]}
                  </Col>
                );
              })}
            </Row>
            {matrix2.map((row, i) => {
              return (
                <Row key={i}>
                  <Col className={"cell"}>{i + 1}</Col>
                  {row.map((cell, j) => {
                    return (
                      <Col
                        x={cell.x}
                        y={cell.y}
                        onClick={(e) => handleStrike(e)}
                        className={`cell ${cell.ship}`}
                        key={j}
                      ></Col>
                    );
                  })}
                </Row>
              );
            })}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
