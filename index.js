/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for(let game of games){
        let div = document.createElement("div");
        div.classList.add("game-card");
        const display = `
        <img src = "${game.img}" alt = "${game.name}" class="game-img">
        <h2> ${game.name} </h2>
        <p> ${game.description} </p>
        `;
        div.innerHTML =display;
        gamesContainer.appendChild(div);
    }
        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}
 addGamesToPage(GAMES_JSON);

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
let totalContributors = GAMES_JSON.reduce((acc, con)=>{return con.backers+acc},0);
contributionsCard.innerHTML=(totalContributors.toLocaleString('en-US'));
// use reduce() to count the number of total contributions by summing the backers


// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
let totalPledged =  GAMES_JSON.reduce((acc, con)=>{return con.pledged+acc},0).toLocaleString('en-US');
raisedCard.innerHTML = "$"+ totalPledged;
// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
let totalGames = GAMES_JSON.length;
gamesCard.innerHTML= totalGames;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    let dupGameList = GAMES_JSON;
    dupGameList = dupGameList.filter(game=>game.goal>game.pledged);
    addGamesToPage(dupGameList);
    // use filter() to get a list of games that have not yet met their goal


    // use the function we previously created to add the unfunded games to the DOM

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    let dupGameList = GAMES_JSON;
    dupGameList=dupGameList.filter(game=>game.goal<=game.pledged);
    addGamesToPage(dupGameList);
    // use filter() to get a list of games that have met or exceeded their goal


    // use the function we previously created to add unfunded games to the DOM

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
    // add all games from the JSON data to the DOM

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let noUnfunded = GAMES_JSON.filter((games)=>games.goal>games.pledged);
let fundedGames = GAMES_JSON.filter((games)=>games.goal<=games.pledged);
let fundsAcc = fundedGames.reduce((acc,games)=>acc=acc+games.pledged,0);
// create a string that explains the number of unfunded games using the ternary operator
let displayStr = `A total of $${fundsAcc} has been raised for ${fundedGames.length} games. Currently ${noUnfunded.length} games remain unfunded. ${noUnfunded.length>0?"We need your help to fund these amazing games!":"Thanks for the amazing support!"}`

// create a new DOM element containing the template string and append it to the description container
let paraToAdd = document.createElement("p");
paraToAdd.innerHTML = displayStr;
descriptionContainer.appendChild(paraToAdd);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});
const [mostFunded, secMostFunded, ...others] = sortedGames;
let h41 = document.createElement("h4");
h41.innerHTML = mostFunded.name;
firstGameContainer.appendChild(h41);
let h42 = document.createElement("h4");
h42.innerHTML = secMostFunded.name;
secondGameContainer.appendChild(h42);

// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item

// scripts.js
function getGame(event) {
    const game = event.target.value;
    let games = GAMES_JSON;
    outer:
    for (let gms of games) {
        if (gms.name === game) {
            
    deleteChildElements(gamesContainer);
            addGamesToPage([gms]);
            break outer;
        }
        else{
            showAllGames();
        }
    }
}

document.getElementById('games').addEventListener('change', getGame);