import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import { strike } from "../api/GamesClient";

export default function GameBoard({ game, user }) {
  const leters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const [matrix, setMatrix] = useState([]);
  const [matrix2, setMatrix2] = useState([]);
  const iAmPlayerOne = game.player1Id === user.id;
  console.log(game);

  useEffect(() => {
    let myShips = [];
    if (iAmPlayerOne) {
      if (game && game.shipsCoord?.length > 0) {
        myShips = game.shipsCoord.filter((f) => f.playerId === game.player1Id);
      }
    } else {
      if (game && game.shipsCoord?.length > 0) {
        myShips = game.shipsCoord.filter((f) => f.playerId === game.player2Id);
      }
    }
    setMatrix(createCells(myShips));
    setMatrix2(createCells(game.moves));
    console.log(myShips);
    console.log(game.moves);
  }, [game, user]);

  function createCells(ships) {
    let aux = [];
    for (let i = 0; i < 10; i++) {
      let row = [];
      for (let j = 0; j < 10; j++) {
        let cell = ships.find((s) => s.x === leters[i] && s.y === j + 1);
        if (cell) {
          row.push({
            x: leters[j],
            y: i + 1,
            ship: iAmPlayerOne
              ? !cell.hit
                ? "bg-success"
                : "bg-danger"
              : cell.result
              ? "bg-success"
              : "bg-warning",
          });
        } else {
          row.push({
            x: leters[j],
            y: i + 1,
            ship: " ",
          });
        }
      }
      aux.push(row);
    }
    return aux;
  }

  function handleStrike(e) {
    e.preventDefault();
    const selectedX = e.target.getAttribute("x");
    const selectedY = e.target.getAttribute("y");
    const req = {
      x: selectedX,
      y: selectedY,
    };
    console.log(req);

    strike(JSON.stringify(req), game.id);
  }

  // console.log(matrix);
  // console.log(matrix2);
  // console.log(myShips);
  // console.log(otherShips);
  return (
    <Row>
      <Col>
        <Row>
          <Col className={"m-2"}>
            <Row>
              <Col className={"my-2"}>
                <h3>{user.email}</h3>
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
                  {!iAmPlayerOne && game.player2 != null
                    ? game.player1.email
                    : "No player"}
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
