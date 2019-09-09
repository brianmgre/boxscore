import axios from "axios";

const url = process.env.REACT_APP_SERVER_URL;

export async function getSports(sport) {
  try {
    const game = await axios.get(`${url}/api/${sport}`);

    return game;
  } catch {
    throw new Error("there was an error");
  }
}
