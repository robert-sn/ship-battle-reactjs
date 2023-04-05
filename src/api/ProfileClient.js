const baseApi = "https://react-labs.softbinator.com/user/details/me";

export async function profileUser() {
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
  return await response;
}
