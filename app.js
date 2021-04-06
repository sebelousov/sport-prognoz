const idResultTour = 'resultTour'
const idResultGamer = 'resultGamer'
const idResultCounter = 'resultCounter'
const idResult = 'result'
const idTableFormat = 'tableFormat'

const host = 'host'
const guest = 'guest'
const hostWin = 'hostWin'
const liter = 'liter'
const goals = 'goals'

const teams = {
    'рот': 'Ротор', 
    'рос': 'Ростов', 
    'цск': 'ЦСКА', 
    'зен': 'Зенит', 
    'ахм': 'Ахмат', 
    'арс': 'Арсенал', 
    'уфа': 'Уфа', 
    'лок': 'Локомотив М', 
    'кра': 'Краснодар', 
    'дин': 'Динамо М', 
    'спа': 'Спартак М', 
    'ура': 'Урал', 
    'руб': 'Рубин', 
    'хим': 'Химки', 
    'соч': 'Сочи', 
    'там': 'Тамбов'
}

let resultTour
let resultGamer
let scores

let button = document.getElementById(idResultCounter)
let inputTour = document.getElementById(idResultTour)
let inputGamer = document.getElementById(idResultGamer)
let tableFormat = document.getElementById(idTableFormat)

button.addEventListener('click', () => {
    // resultTour = getGames(inputTour)
    // resultGamer = getGames(inputGamer)
    
    scores = getScores(resultGamer)
    showScores(scores)
})

inputTour.addEventListener('paste', () => {
    setTimeout(() => {
        resultTour = getGames(inputTour)
        showGames(resultTour, 'showResultTour')
      }, 100)
})

inputGamer.addEventListener('paste', () => {
    setTimeout(() => {
        resultGamer = getGames(inputGamer)
        showGames(resultGamer, 'showResultGamer')
      }, 100)
})

tableFormat.addEventListener('paste', () => {
    setTimeout(() => {
        console.log('ooops...')
        tableFormat.value = 'ooops...'
      }, 1)
})

function getGames(results) {
    if (results === undefined) {
        return -1
    }

    return results.value.split('\n')
        .map((s) => getGameResultFromString(s))
}

function getGameResultFromString(s) {
    arr = s.trim()
        .substring(s.match(/[а-яА-Я]+/).index)
        .split(/[^0-9А-Яа-я]+/)
        .filter(value => value.length > 1 || /^-?[\d.]+(?:e-?\d+)?$/.test(value))
        .map(value => {
            return value.substring(0, 3)
                        .toLowerCase()
          })
    
    let game = {}

    game[host] = arr[0]
    game[guest] = arr[1]
    game[goals] = [parseInt(arr[2]), parseInt(arr[3])]
    game[hostWin] = game[goals][0] > game[goals][1] ? 1 : game[goals][0] === game[goals][1] ? 0 : -1
    game[liter] = game[host] + game[guest]
    
    return game
}

function getScores(resultGamer) {
    let scores = 0
    resultGamer.forEach(game => {
        let gameSource = resultTour.find(g => g[liter] === game[liter])
        scores += compare(gameSource, game)
    });
    return scores
}

function compare(gameSource, game) {
    if (game[goals][0] === gameSource[goals][0] && game[goals][1] === gameSource[goals][1]) {
        return 3
    } else if (game[hostWin] === gameSource[hostWin]) {
        return 1
    } else {
        return 0
    }
}

function showScores(scores) {
    let elementOut = document.getElementById(idResult)
    elementOut.innerHTML = scores
}

function showGames(games, output) {
    let elementOut = document.getElementById(output);
    let table = '<table>'
    
    for (let i = 0; i < games.length; i++) {
        //console.log(games[i][goals][0])
        table += '<tr>'
        table += '<td>' + teams[games[i][host]] + ' - ' + teams[games[i][guest]] + '</td>'
                 + '<td>' + games[i][goals][0] + ' - ' + games[i][goals][1] + '</td>'
        table += '</tr>'
    }
    
    table += '</table>'
    // elementOut.insertAdjacentHTML('afterbegin', table)
    elementOut.innerHTML = table
}

function checkoutGame(game) {
    //
}

/*
21   06.03.2021  14:00   ЦСКА – Ахмат   1 : 0   
21   06.03.2021  16:30   Ротор – Химки   1 : 1   
21   06.03.2021  19:00   Ростов – Сочи   2 : 1   
21   07.03.2021  14:00   Урал – Уфа   1 : 0   
21   07.03.2021  16:30   Динамо М – Тамбов   2 : 0   
21   07.03.2021  19:00   Спартак М – Краснодар   1 : 2
21   08.03.2021  14:00   Арсенал – Локомотив М   0 : 2   
21   08.03.2021  16:30   Рубин – Зенит   1 : 2

21   06.03.2021  14:00   ЦСКА – Ахмат   1 : 0   
21   06.03.2021  16:30   Ротор – Химки   1 : 1   
21   06.03.2021  19:00   Ростов – Сочи   2 : 1   
21   07.03.2021  14:00   Урал – Уфа   1 : 0   
21   07.03.2021  16:30   Динамо М – Тамбов   2 : 0   
21   07.03.2021  19:00   Спартак М – Краснодар   1 : 1
21   08.03.2021  14:00   Арсенал – Локомотив М   0 : 2   
21   08.03.2021  16:30   Рубин – Зенит   1 : 2
---
23   17.03.2021  18:00   Ротор – Ростов   0 : 4   
23   17.03.2021  20:00   ЦСКА – Зенит   2 : 3   
23   17.03.2021  20:00   Ахмат – Арсенал   2 : 0   
23   18.03.2021  17:00   Уфа – Локомотив М   0 : 1   
23   18.03.2021  19:00   Краснодар – Динамо М   2 : 3   
23   18.03.2021  19:00   Спартак М – Урал   5 : 1   
23   19.03.2021  19:00   Рубин – Химки   1 : 3   
23   19.03.2021  19:00   Сочи – Тамбов   5 : 0

23   17.03.2021  18:00   Ротор – Ростов   0 : 1   
23   17.03.2021  20:00   ЦСКА – Зенит   1 : 2   
23   17.03.2021  20:00   Ахмат – Арсенал   2 : 1   
23   18.03.2021  17:00   Уфа – Локомотив М   0 : 2   
23   18.03.2021  19:00   Краснодар – Динамо М   2 : 1   
23   18.03.2021  19:00   Спартак М – Урал   2 : 1
23   19.03.2021  19:00   Рубин – Химки   2 : 1   
23   19.03.2021  19:00   Сочи – Тамбов   2 : 0

scores - 6

23   17.03.2021  18:00   Ротор – Ростов                0:1     
23   17.03.2021  20:00   ЦСКА – Зенит                  1:1
23   17.03.2021  20:00   Ахмат – Арсенал             2:1
23   18.03.2021  17:00   Уфа – Локомотив М         0:1
23   18.03.2021  19:00   Краснодар – Динамо М    1:0
23   18.03.2021  19:00   Спартак М – Урал            2:0
23   19.03.2021  19:00   Рубин – Химки                2:1
23   19.03.2021  19:00   Сочи – Тамбов                2:0

Ротор локо 1-2
Рубин сочи 2-1
Краснодар ахмат 2-1
Динамо уфа 2-0
Урал арсенал 2-0
Тамбов цска 0-3
Ростов спартак 1-1
Зенит химки 2-0

*/