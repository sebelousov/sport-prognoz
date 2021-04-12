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

const view = {
    'resultTour': 'showResultTour',
    'resultGamer': 'showResultGamer'
}

let button = document.getElementById(idResultCounter)
let inputTour = document.getElementById(idResultTour)
let inputGamer = document.getElementById(idResultGamer)
let tableFormat = document.getElementById(idTableFormat)

button.addEventListener('click', () => {
    let scores = getScores()
    showScores(scores)
})

inputTour.addEventListener('paste', (event) => {
    setTimeout(() => {
        refreshTextArea(document.querySelector('#' + event.target.id))
      }, 1)
})

inputGamer.addEventListener('paste', (event) => {
    setTimeout(() => {
        refreshTextArea(document.querySelector('#' + event.target.id))
      }, 1)
})

function refreshTextArea(textArea) {
    let games = getGames(textArea)
    showGames(games, view[textArea.id])
}

tableFormat.addEventListener('paste', () => {
    setTimeout(() => {
        tableFormat.value = formatTable(tableFormat.value)
      }, 1)
})

function getGames(results) {
    if (results === undefined) {
        return undefined
    }

    let games = results.value.split('\n')
        .map((s) => getGameResultFromString(s))

    return checkoutGames(games)
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

function getScores() {
    let scores = 0
    let resultTour = getGames(inputTour)
    let resultGamer = getGames(inputGamer)
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
    
    if (scores === -1) {
        elementOut.innerHTML = 'No input data...'
    } else {
        elementOut.innerHTML = scores
    }
}

function showGames(games, output) {
    let elementOut = document.getElementById(output);
    let table = ''

    if (games) {
        table = '<table>'
        
        for (let i = 0; i < games.length; i++) {
            //console.log(games[i][goals][0])
            table += '<tr>'
            table += '<td>' + teams[games[i][host]] + ' - ' + teams[games[i][guest]] + '</td>'
                    + '<td>' + games[i][goals][0] + ' - ' + games[i][goals][1] + '</td>'
            table += '</tr>'
        }
        
        table += '</table>'
    } else {
        table = 'Uncorrect input data...'
    }

    elementOut.innerHTML = table
}

function checkoutGames(games) {
    /* 
    0. resultTour.length < resultGamer.length
    1. host, guest должны быть строкой из букв длиной 3 символа.
    2. goals должен быть массивом длиной 2 с двумя числами больше и равно нулю. 
    3. hostWin должен быть равен 1, 0 или -1. 
    4. liter должен быть строкой из букв длиной 6 символов. 
    */

    
    

    return games
}

function formatTable(value) {
    if (!value) {
        return -1
    }
    
    let head = '[tr][td][b]место[/b][/td][td][b]ники[/b][/td][td][b]итого[/b][/td][td][b] тур[/b][/td][/tr]\n'
    let table = value.replaceAll(/\t/g, '[/td][td]')
        .replaceAll(/\n/g, '[/td][/tr]\n[tr][td]')
    
    table = '[table]\n' + head + '[tr][td]' + table + '[/td][/tr]' + '\n[/table]' + '\n\nЕсли что не так, пожалуйста, пишите, поправлю.'
    
    return table
}

function addTags(string, tag) {
    return tag + string + tag
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

1	Пал_Геннадичъ	142	10
2	Хрустальная гора	141	6
3	Толич1	141	10
4	Ded_Moroz	137	10
5	Smith242	129	10
6	Быш	120	10
7	Fass 18	10	0

[tr][td][b]место[/b][/td][td][b]ники[/b][/td][td][b]итого[/b][/td][td][b] тур[/b][/td][/tr]
[tr][td]1[/td][td]Пал_Геннадичъ[/td][td]142[/td][td]10[/td][/tr]
[tr][td]2[/td][td]Хрустальная гора[/td][td]141[/td][td]6[/td][/tr]
[tr][td]3[/td][td]Толич1[/td][td]141[/td][td]10[/td][/tr]
[tr][td]4[/td][td]Ded_Moroz[/td][td]137[/td][td]10[/td][/tr]
[tr][td]5[/td][td]Smith242[/td][td]129[/td][td]10[/td][/tr]
[tr][td]6[/td][td]Быш[/td][td]120[/td][td]10[/td][/tr]
[tr][td]7[/td][td]Fass 18[/td][td]10[/td][td]0[/td][/tr]
*/