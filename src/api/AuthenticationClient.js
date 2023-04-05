
const baseApi = "https://react-labs.softbinator.com/auth";

export async function registerUser(requestBody) {

    let request = {
        headers: { 'Content-Type': 'application/json' },
        method: "POST",
        body: requestBody
    }

    let response = await fetch(baseApi + "/register", request)
                    .then(resp => resp.json());
    console.log("Response from register: ");
    console.log(response)
    return response;
}

export async function loginUser(requestBody) {

    let request = {
        headers: { 'Content-Type': 'application/json' },
        method: "POST",
        body: requestBody
    }

    let response = await fetch(baseApi + "/login", request)
                    .then((resp) => resp.json());
    console.log("Response from login: ");
    console.log(response)
    return response;
}