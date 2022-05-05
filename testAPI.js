const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://sudoku-board.p.rapidapi.com/new-board',
  params: {diff: '2', stype: 'list', solu: 'true'},
  headers: {
    'X-RapidAPI-Host': 'sudoku-board.p.rapidapi.com',
    'X-RapidAPI-Key': 'e49f319e74msh5ef24ebe8a867fep178bf2jsnfa33e7e46235'
  }
};

axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
});