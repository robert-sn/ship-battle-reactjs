import { shipsV2 } from "../model/Ships";

const baseApi = "https://react-labs.softbinator.com/game";

export async function getAllGames() {
  let authToken = "Bearer " + sessionStorage.getItem("token");

  let request = {
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken,
    },
    method: "GET",
  };

  let response = await fetch(baseApi, request).then((resp) => resp.json());
  // console.log(response);
  return response.games;
}

export async function getGameById(gameId) {
  let authToken = "Bearer " + sessionStorage.getItem("token");

  let request = {
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken,
    },
    method: "GET",
  };

  let response = await fetch(baseApi + "/" + gameId, request).then((resp) =>
    resp.json()
  );
  // console.log(response);
  return response;
}

export async function joinGame(gameId) {
  let authToken = "Bearer " + sessionStorage.getItem("token");

  let request = {
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken,
    },
    method: "POST",
  };

  let response = await fetch(baseApi + "/join/" + gameId, request).then(
    (resp) => resp.json()
  );

  if (response.code) {
    response = await getGameById(gameId);
  }
  return await response;
}

export async function gameConfig(gameId, mapConfig) {
  let authToken = "Bearer " + sessionStorage.getItem("token");

  let request = {
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken,
    },
    method: "PATCH",
    body: mapConfig,
  };

  let response = await fetch(baseApi + "/" + gameId, request).then((resp) =>
    resp.json()
  );
  console.log(response);
  return await response;
}

export async function gameConfigDefault(gameId) {
  let authToken = "Bearer " + sessionStorage.getItem("token");

  let request = {
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken,
    },
    method: "PATCH",
    body: JSON.stringify(shipsV2),
  };

  let response = await fetch(baseApi + "/" + gameId, request).then((resp) =>
    resp.json()
  );
  console.log(response);
  return await response;
}

export async function createGame() {
  let authToken = "Bearer " + sessionStorage.getItem("token");

  let request = {
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken,
    },
    method: "POST",
  };

  let response = await fetch(baseApi, request).then((resp) => resp.json());
  console.log(response);
  if (!response.code) {
    sessionStorage.setItem("gameId", response.id);
  }
  return await response;
}

export async function strike(requestBody, gameId) {
  let authToken = "Bearer " + sessionStorage.getItem("token");

  let request = {
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken,
    },
    method: "POST",
    body: requestBody,
  };

  let response = await fetch(baseApi + `\\strike\\${gameId}`, request).then(
    (resp) => resp.json()
  );
  console.log(response);
  return await response;
}
