const idResultTour = 'resultTour'
const idResultGamer = 'resultGamer'

const host = 'host'
const guest = 'guest'
const hostWin = 'hostWin'
const liter = 'liter'
const goals = 'goals'

let resultTour
let resultGamer

let button = document.querySelector('button')

button.addEventListener('click', () => {
    let regexp = /[а-яА-Я]+/
    resultTour = getGames(document.getElementById(idResultTour))
    resultGamer = getGames(document.getElementById(idResultGamer))
    // console.log(resultTour)
    // console.log(resultGamer)

    console.log(getScores(resultTour, resultGamer))
})

function getGames(results) {
    if (results === undefined) {
        return -1
    }

    return results.value
                    .split('\n')
                    .map((s) => {
                        let result = getGameResultFromString(
                                        s.substring(s.match(regexp).index)
                                         .trim()
                                        )
                        let out = {}
                        out[host] = result[0]
                        out[guest] = result[1]
                        out[goals] = [parseInt(result[2]), parseInt(result[3])]
                        out[hostWin] = out[goals][0] > out[goals][1] ? 1 : out[goals][0] === out[goals][1] ? 0 : -1
                        out[liter] = result[0].substring(0, 3).toLowerCase()
                        return out
                    })
}

function getGameResultFromString(game) {
    let regExp = /[^0-9А-Яа-я]{2,}/
    return game.split(regExp)
}

function getScores(resultGamer) {
    let scores = 0
    resultGamer.forEach(game => {
        let gameSource = findGameInResultTour(game[liter])
        scores += compare(gameSource, game)
    });
    return scores
}

function findGameInResultTour(literGame) {
    for (let game of resultTour) {
        if (game[liter] === literGame) {
            return game
        }
    }
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

// function shell(resultTour, inputData, result) {
//     let inputElement = document.getElementById(input).value;
//     let elementOut = document.getElementById(result);
//     elementOut.innerHTML = inputElement;
// }

/*
21   06.03.2021  14:00   ЦСКА – Ахмат   1 : 0   
21   06.03.2021  16:30   Ротор – Химки   1 : 1   
21   06.03.2021  19:00   Ростов – Сочи   2 : 1   
21   07.03.2021  14:00   Урал – Уфа   1 : 0   
21   07.03.2021  16:30   Динамо М – Тамбов   2 : 0   
21   07.03.2021  19:00   Спартак М – Краснодар   1 : 2
21   08.03.2021  14:00   Арсенал – Локомотив М   0 : 2   
21   08.03.2021  16:30   Рубин – Зенит   1 : 2
*/