let button = document.querySelector('button')
let resultTour = document.getElementById('resultTour')
let resultGamer = document.getElementById('resultGamer')

button.addEventListener('click', () => {
    let regexp = /[а-яА-Я]+/
    let strings = resultTour.value
                            .split('\n')
                            .map((s) => {
                                return s.substring(s.match(regexp).index)
                            })
    for (let iterator of strings) {
        console.log(getGameResult(iterator))
    }
    //console.log(resultGamer.value)
})

function getGameResult(string) {
    let regExp = /[^0-9А-Яа-я]+/
    return string.split(regExp)
                 .filter((e) => {
                  console.log(e)
                  return e.length > 1 && /[а-яА-Я]+/.test(e)
    })
}

// function shell(resultTour, inputData, result) {
//     let inputElement = document.getElementById(input).value;
//     let elementOut = document.getElementById(result);
//     elementOut.innerHTML = inputElement;
// }