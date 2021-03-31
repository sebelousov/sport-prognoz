let button = document.querySelector('button')
let resultTour
let resultGamer = document.getElementById('resultGamer')

button.addEventListener('click', () => {
    let regexp = /[а-яА-Я]+/
    resultOfTour = getGames(document.getElementById('resultTour'))
    resultGamer = getGames(document.getElementById('resultGamer'))
    console.log(resultOfTour)
    console.log(resultGamer)
})

function getGames(results) {
    return results.value
                  .split('\n')
                  .map((s) => {
                        let result = getGameResult(
                                        s.substring(s.match(regexp).index)
                                         .trim()
                                        )
                        let out = {}
                        out[result[0]] = parseInt(result[2])
                        out[result[1]] = parseInt(result[3])
                        out['hostWin'] = out[result[0]] > out[result[1]]
                        out['isDraw'] = out[result[0]] === out[result[1]]
                        return out
                    })
}

function getGameResult(game) {
    let regExp = /[^0-9А-Яа-я]{2,}/
    return game.split(regExp)
}

function compareResults(resultOfTour, resultGamer) {
    
}

// function shell(resultTour, inputData, result) {
//     let inputElement = document.getElementById(input).value;
//     let elementOut = document.getElementById(result);
//     elementOut.innerHTML = inputElement;
// }

// 21   06.03.2021  14:00   ЦСКА – Ахмат   1 : 0   
// 21   06.03.2021  16:30   Ротор – Химки   1 : 1   
// 21   06.03.2021  19:00   Ростов – Сочи   2 : 1   
// 21   07.03.2021  14:00   Урал – Уфа   1 : 0   
// 21   07.03.2021  16:30   Динамо М – Тамбов   2 : 0   
// 21   07.03.2021  19:00   Спартак М – Краснодар   1 : 2
// 21   08.03.2021  14:00   Арсенал – Локомотив М   0 : 2   
// 21   08.03.2021  16:30   Рубин – Зенит   1 : 2