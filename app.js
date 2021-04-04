const idResultTour = 'resultTour'
const idResultGamer = 'resultGamer'
const idResultCounter = 'resultCounter'
const idResult = 'result'

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

button.addEventListener('click', () => {
    resultTour = getGames(document.getElementById(idResultTour))
    resultGamer = getGames(document.getElementById(idResultGamer))
    
    scores = getScores(resultGamer)
    showScores(scores)
})

function getGames(results) {
    if (results === undefined) {
        return -1
    }

    return results.value
                    .split('\n')
                    .map((s) => {
                        let result = getGameResultFromString(s)
                        let out = {}
                        out[host] = result[0]
                        out[guest] = result[1]
                        out[goals] = [parseInt(result[2]), parseInt(result[3])]
                        out[hostWin] = out[goals][0] > out[goals][1] ? 1 : out[goals][0] === out[goals][1] ? 0 : -1
                        out[liter] = result[0].substring(0, 3).toLowerCase()
                        return out
                    })
}

function getGameResultFromString(s) {
    return s.substring(s.match(/[а-яА-Я]+/).index).trim().split(/[^0-9А-Яа-я]{2,}/)
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
    let elementOut = document.getElementById(idResult);
    elementOut.innerHTML = scores;
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