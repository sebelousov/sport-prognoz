let button = document.querySelector('button')
let resultTour = document.getElementById('resultTour')
let resultGamer = document.getElementById('resultGamer')

button.addEventListener('click', () => {
    console.log(resultTour.value
                          .split('\n'))
    console.log(resultGamer.value)
})

// function shell(resultTour, inputData, result) {
//     let inputElement = document.getElementById(input).value;
//     let elementOut = document.getElementById(result);
//     elementOut.innerHTML = inputElement;
// }