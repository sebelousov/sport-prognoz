const host = 'host'
const guest = 'guest'
const hostWin = 'hostWin'
const liter = 'liter'
const goals = 'goals'
const tourNumber = document.getElementById('tourNumber')
const league = 'rpl2021'

const formatTable = {state: true};

const radios = document.querySelectorAll('input[type=radio]')
radios.forEach((radio) => {
  radio.addEventListener('change', () => {
    formatTable.state = !formatTable.state
  })
})

const abbreviated = {
  'кс': 'кры',
  'нн': 'ниж'
}

const listTeams = {
    'rpl2020': {
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
    }, 
    'rpl2021': {
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
        'ниж': 'Нижний Новгород',
        'кры': 'Крылья Советов',
    }, 
    'euro': {
        'турц': 'Турция',
        'итал': 'Италия',
        'уэль': 'Уэльс',
        'швей': 'Швейцария',
        'дани': 'Дания',
        'финл': 'Финляндия',
        'бель': 'Бельгия',
        'росс': 'Россия',
        'англ': 'Англия',
        'хорв': 'Хорватия',
        'авст': 'Австрия',
        'севе': 'Северная Македония',
        'ниде': 'Нидерланды',
        'укра': 'Украина',
        'шотл': 'Шотландия',
        'чехи': 'Чехия',
        'поль': 'Польша',
        'слов': 'Словакия',
        'испа': 'Испания',
        'швец': 'Швеция',
        'венг': 'Венгрия',
        'порт': 'Португалия',
        'фран': 'Франция',
        'герм': 'Германия'
    }
}

const teams = listTeams[league]

const handlers = [
    function(textArea) {
        let getTeam = team => {
            return team.toLowerCase()
                .substring(0, 3)
        }
        
        let getGame = (gameArr) => {
            let game = {}
            
            game[host] = getTeam(gameArr[0])
            game[guest] = getTeam(gameArr[1])
            game[goals] = [parseInt(gameArr[2]), parseInt(gameArr[3])]
            game[hostWin] = game[goals][0] > game[goals][1] ? 1 : game[goals][0] === game[goals][1] ? 0 : -1
            game[liter] = game[host] + game[guest]

            return game
        }
        
        const deleteDoubleNames = (value) => {
          const doubleNames = () => {
            let out = []

            for (let [team, value] of Object.entries(teams)) {
              if (value.includes(' ')) {
                out.push(value.substring(value.indexOf(' ')))
              }
            }
            return out
          }

          doubleNames().forEach(e => {
            value = value.replaceAll(e, '')
          })

          return value
        }
        
        let games = []
        
        deleteDoubleNames(textArea.value)
            .trim()
            .split(/[^0-9А-Яа-я]+/ig)
            .filter((e, index, arr) => 
                    /[А-Яа-я]+/ig.test(e) || 
                    (/\d+/.test(e) && 
                       (/[А-Яа-я]+/ig.test(arr[index - 1]) || 
                        /[А-Яа-я]+/ig.test(arr[index - 2]))))
            .map((e) => e.substring(0, 3).toLowerCase())
            .map((e) => Object.keys(abbreviated).includes(e) ? abbreviated[e] : e)
            .map((e, index, gArr) => {
                if (index % 4 === 0) {
                    let game = getGame([gArr[index], gArr[index + 1], gArr[index + 2], gArr[index + 3]])
                    games.push(game)
                }
            })
        
        return games.sort((a, b) => {
          return a.host > b.host ? 1 : a.host < b.host ? -1 : 0
        })
  }
]

class Element {
    constructor(options) {
        this.$element = document.getElementById(options.selector)
    }
}

class Table extends Element {
    constructor(options) {
        super(options)
        
        this.$element.addEventListener('paste', () => {
            setTimeout(() => {
                this.$element.value = this.formatTable(this.$element.value)
            }, 1)
        })
        
        this.$element.addEventListener('blur', (event) => {
            event.target.value = ''
        })
    }

    formatTable(value) {
      if (formatTable.state) {
        return this.formatResultTable(value)    
      } else {
        return this.formatScoresTable(value)
      }
    }
  
    formatResultTable(value) {
        if (!value) {
            return -1
        }
        
        let head = '[tr][td][b]место[/b][/td][td][b]ники[/b][/td][td][b]итого[/b][/td][td][b] тур[/b][/td][/tr]\n'
        let table = value.replaceAll(/\t/g, '[/td][td]')
            .replaceAll(/\n/g, '[/td][/tr]\n[tr][td]')
        
        table = `[table]\n${head}[tr][td]${table}[/td][/tr]\n[/table]\n\nЕсли что не так, пожалуйста, пишите, поправлю.`
        
        return table
    }
  
    formatScoresTable(value) {
      let result = ''
      let size = 4
      let array = value.trim()
          .replaceAll('\n', '\t')
          .split('\t')
          .filter(e => e != '')
      
      while (array.length > 0) {
        result += array.splice(0, size).join('\t') + '\n'
      }
      
      return result
      
    }
}

class ButtonRefresh extends Element {
    constructor(options) {
        super(options)
        this.input = options.input[0]
        this.output = [options.output[0]]
        this.reader = options.reader
        this.source = options.source
        
        this.$element.addEventListener('click', () => {
            if (this.source) {
                
            }
            
            this.input.games = this.reader.read(this.input.$element)
            Printer.showGames(this.input.games, this.output[0].$element)
        })
    }
}

class ButtonCounter extends Element {
    constructor(options) {
        super(options)
        this.resultTour = options.input[0]
        this.forecast = options.input[1]
        this.output = [options.output[0], options.output[1]]
        
        this.$element.addEventListener('click', () => {
            try {
                this.output[0].$element.innerHTML = Calculator.calculate(this.resultTour.games, this.forecast.games)
                Printer.showGames(this.forecast.games, this.output[1].$element)
            } catch (error) {
                this.output.$element.innerHTML = 'Uncorrect input data...'
            }
        })
    }
}

class Forecast {
    constructor(games) {
        this.games = games
    }
}

class Printer {
    static showGames(games, output) {
        let table = `<table class="table table-striped table-hover">`
        
        const addClasses = (scores) => {
            let className = ''
            
            if (scores === 3) {
                className += 'badge rounded-pill bg-success'
            } else if (scores === 1) {
                className += 'badge rounded-pill bg-primary'
            } else {
                className += 'badge rounded-pill bg-danger'
            }
            
            return className
        }
        
        const addCol = (scores) => {
            if (scores === 3) {
                return `<td><span class='${addClasses(scores)}'>+3</span></td>`
            } else if (scores === 1) {
                return `<td><span class='${addClasses(scores)}'>+1</span></td>`
            } else if (scores === 0) {
                return `<td><span class='${addClasses(scores)}'>--</span></td>`
            } else {
                return ''
            }
        }
        
        if (games) {
            for (let i = 0; i < games.length; i++) {
                table += `<tr">
                    <td>${teams[games[i][host]]} - ${teams[games[i][guest]]}</td>
                    <td>${games[i][goals][0]} - ${games[i][goals][1]}</td>
                    ${addCol(games[i].scores)}
                    </tr>\n`
            }
        } else {
            table = 'Uncorrect input data...'
        }
        
        table += '</table>'
    
        output.innerHTML = table
    }
}

class Reader {
    constructor(handler) {
        this.handler = handler
    }
    
    read(input) {
        return this.handler(input)
    }
}

class Calculator {
    static calculate(tour, gamer) {
        let scores = 0

        let compareGames = (gameSource, gameForecast) => {
            if (gameForecast[goals][0] === gameSource[goals][0] && 
                gameForecast[goals][1] === gameSource[goals][1]) {
                gameForecast['scores'] = 3
                return gameForecast['scores']
            } else if (gameForecast[hostWin] === gameSource[hostWin]) {
                gameForecast['scores'] = 1
                return gameForecast['scores']
            } else {
                gameForecast['scores'] = 0
                return gameForecast['scores']
            }
        }

        gamer.forEach(game => {
            let gameSource = tour.find(g => g[liter] === game[liter])
            scores += compareGames(gameSource, game)
        });
        return scores
    }
}

let resultTour = new Element({
    selector: 'resultTour'
})

let resultGamer = new Element({
    selector: 'resultGamer'
})

let scores = new Element({
    selector: 'scores'
})

let outputTour = new Element({
    selector: 'showResultTour'
})

let outputGamer = new Element({
    selector: 'showResultGamer'
})

let table = new Table({
    selector: 'tableFormat'
})

let refreshTour = new ButtonRefresh({
    selector: 'refreshResultTour',
    input: [resultTour],
    output: [outputTour],
    reader: new Reader(handlers[0]),
    source: tourNumber
})

let refreshGamer = new ButtonRefresh({
    selector: 'refreshResultGamer',
    input: [resultGamer],
    output: [outputGamer],
    reader: new Reader(handlers[0]),
    source: null
})

let counter = new ButtonCounter({
    selector: 'resultCounter',
    input: [resultTour, resultGamer],
    output: [scores, outputGamer]
})



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

function addTags(string, tag) {
    return tag + string + tag
}

/*
26   17.04.2021  14:00   Ахмат – Химки   3 : 1   
26   17.04.2021  16:30   Ротор – Динамо М   0 : 3   
26   17.04.2021  16:30   Локомотив М – Ростов   4 : 1   
26   17.04.2021  19:00   Краснодар – Зенит   2 : 2   
26   18.04.2021  12:00   Урал – Рубин   0 : 1   
26   18.04.2021  14:00   Арсенал – Тамбов   4 : 0   
26   18.04.2021  16:30   Сочи – ЦСКА   2 : 1   
26   18.04.2021  19:00   Спартак М – Уфа   0 : 3
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
23   17.03.2021  20:00   Ахмат – Арсенал             2:1
23   17.03.2021  20:00   ЦСКА – Зенит                  1:1
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
		26	17.04.2021  14:00	
Ахмат – Химки
3 : 1	
26	17.04.2021  16:30	
Ротор – Динамо М
0 : 3	
26	17.04.2021  16:30	
Локомотив М – Ростов
4 : 1	
26	17.04.2021  19:00	
Краснодар – Зенит
2 : 2	
26	18.04.2021  12:00	
Урал – Рубин
0 : 1	
26	18.04.2021  14:00	
Арсенал – Тамбов
4 : 0	
26	18.04.2021  16:30	
Сочи – ЦСКА
2 : 1	
26	18.04.2021  19:00	
Спартак М – Уфа
0 : 3

[tr][td][b]место[/b][/td][td][b]ники[/b][/td][td][b]итого[/b][/td][td][b] тур[/b][/td][/tr]
[tr][td]1[/td][td]Пал_Геннадичъ[/td][td]142[/td][td]10[/td][/tr]
[tr][td]2[/td][td]Хрустальная гора[/td][td]141[/td][td]6[/td][/tr]
[tr][td]3[/td][td]Толич1[/td][td]141[/td][td]10[/td][/tr]
[tr][td]4[/td][td]Ded_Moroz[/td][td]137[/td][td]10[/td][/tr]
[tr][td]5[/td][td]Smith242[/td][td]129[/td][td]10[/td][/tr]
[tr][td]6[/td][td]Быш[/td][td]120[/td][td]10[/td][/tr]
[tr][td]7[/td][td]Fass 18[/td][td]10[/td][td]0[/td][/tr]
*/