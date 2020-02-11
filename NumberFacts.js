const BASE_URL = "http://numbersapi.com";

// async function getNumber() {
//   let response = await axios.get(`${BASE_URL}/20?json`);
//   console.log(response);
//   console.log(response.data.text)

// }

function getNumberFetch() {
	fetch(`${BASE_URL}/20?json`).then((response) => response.json()).then((data) => console.log(data.text));
}

async function getNumbers() {
	const nums = [ 1, 5, 10, 30 ];
	let response = await axios.get(`${BASE_URL}/${nums}?json`);
	console.log(response);
	for (ind in response.data) {
		console.log(response.data[ind].text);
	}
}

async function getFactsAboutNumber(num) {
	let p1 = axios.get(`${BASE_URL}/${num}/?json`);
	let p2 = axios.get(`${BASE_URL}/${num}/?json`);
	let p3 = axios.get(`${BASE_URL}/${num}/?json`);
	let p4 = axios.get(`${BASE_URL}/${num}/?json`);

	let answersArray = await Promise.all([ p1, p2, p3, p4 ]);
	// answersPromise.then(val => {return (val.map(numObj => numObj.data.text))})
	// let answersArray = await answersPromise;
	let textArray = answersArray.map((val) => val.data.text);
	// console.log("textArray: ", textArray)
	updateHtml(textArray);
	// return textArray;
}

function updateHtml(textArray) {
	textArray.forEach((fact) => $("body").append(`<p>${fact}</p>`));
	// $("body").append()
}

// ***************************
// deck of cards

let deck_id;

async function getShuffledDeck() {
	let deck = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
	deck_id = deck.data.deck_id;
}

async function draw(deck_id) {
	let resp = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
	// const suit = resp.data.cards[0].suit;
  // const value = resp.data.cards[0].value;
  let { suit, value } = data.cards[0];
	return `${value} of ${suit}`;
	// return resp;
}

// async function getTwoCards(deck_id) {
// 	let p1 = draw(deck_id);
// 	let p2 = draw(deck_id);
// 	let r1 = await p1;
// 	let r2 = await p2;
// 	let responses = [ r1, r2 ];
// 	let cards = responses.map((r) => {
// 		return r.data.cards[0];
// 	});
// 	return cards.map((card) => {
// 		const suit = card.suit;
// 		const value = card.value;
// 		return `${value} of ${suit}`;
// 	});
// }
getShuffledDeck();

$(function() {
	const $drawCard = $("#draw-card");
	const $drawnCards = $("#drawn-cards");

	$drawCard.on("click", $("button"), async function(evt) {
		evt.preventDefault();
		let card = await draw(deck_id);
		// console.log("CARD INSIDE SUBMIT LISTENER", card);
		$($drawnCards).append(`<li>${card}</li>`);
	});
});
