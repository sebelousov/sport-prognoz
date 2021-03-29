let button = document.querySelector('button')
button.addEventListener('click', () => {
    console.log('button')
})

function shell(resultTour, inputData, result) {
    let inputElement = document.getElementById(input).value;
    let elementOut = document.getElementById(result);
    elementOut.innerHTML = inputElement;
}