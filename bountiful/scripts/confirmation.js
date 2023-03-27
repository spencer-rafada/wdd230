import Navbar from "./Navbar.js";

const fruityvice_URL = "https://fruityvice.com/api/fruit/";
const nav = new Navbar();

const url = new URL(window.location);
const params = url.searchParams;

params.forEach((item) => console.log(item));

const getData = async () => {
  // TODO: ask TA about this
  try {
    let headers = new Headers();

    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Credentials", "true");

    const response = await fetch(fruityvice_URL + `all`, { headers: headers });
  } catch (error) {
    console.log(error);
  }
  console.log(params.get(`flavor`));
};

getData();
