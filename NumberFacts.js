const BASE_URL = "http://numbersapi.com";

// async function getNumber() {
//   let response = await axios.get(`${BASE_URL}/20?json`);
//   console.log(response);
//   console.log(response.data.text)
  
// }

function getNumberFetch() {
  fetch(`${BASE_URL}/20?json`)
    .then(response => response.json())
    .then(data => console.log(data.text))
}


async function getNumbers() {
  const nums = [1, 5, 10, 30]
  let response = await axios.get(`${BASE_URL}/${nums}?json`);
  console.log(response);
  for (ind in response.data) {
    console.log(response.data[ind].text)
  }
}

async function getFactsAboutNumber(num) {
  let p1 = axios.get(`${BASE_URL}/${num}/?json`)
  let p2 = axios.get(`${BASE_URL}/${num}/?json`)
  let p3 = axios.get(`${BASE_URL}/${num}/?json`)
  let p4 = axios.get(`${BASE_URL}/${num}/?json`)

  let answersArray = await Promise.all([p1,p2,p3,p4]);
  // answersPromise.then(val => {return (val.map(numObj => numObj.data.text))})
  // let answersArray = await answersPromise;
  let textArray =  answersArray.map(val => val.data.text)
  // console.log("textArray: ", textArray)
  updateHtml(textArray);
  // return textArray;
}

function updateHtml(textArray) {
  textArray.forEach(fact => $("body").append(`<p>${fact}</p>`))
  // $("body").append()
}