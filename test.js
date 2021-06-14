// function unique(arr) {
//     return new Set(arr)
// }

// let values = ["Hare", "Krishna", "Hare", "Krishna",
// "Krishna", "Krishna", "Hare", "Hare", ":-O"]

// console.log(values)
// console.log(unique(values))

// function aclean(arr) {
//     let map = new Map()
//     arr.forEach(element => {
//         let temp = element.toLowerCase()
//             .split('')
//             .sort()
//             .join('')
        
//         map.set(temp, element)
//     });

//     return Array.from(map.values())
// }

// let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"]

// console.log(aclean(arr))

// let map = new Map()

// map.set('name', 'John')
// let keys = map.keys()
// keys.push('more')
// console.log(keys)

// let salaries = {
//     'John': 100,
//     'Pete': 300,
//     'Mary': 250
// }

// let sumSalaries = (salaries) => {
//     return Object.values(salaries)
//         .reduce((acc, value) => acc + value, 0)
// }

// console.log(sumSalaries(salaries))

// let user = {
//     name: 'John',
//     age: 30
// }

// let count = user => Object.keys(user).length

// console.log(count(user))

// let user = {
//     name: 'John',
//     age: 30
// }

// let {name, age, isAdmin = false} = user

// console.log(name)
// console.log(age)
// console.log(isAdmin)

// let salaries = {
//     'John': 100,
//     'Pete': 300,
//     'Mary': 250
// }

// let topSalary = (salaries) => {
//     let maxSalary = Math.max(...Object.values(salaries))
    
//     for (let [key, value] of Object.entries(salaries)) {
//         if (maxSalary === value) {
//             return key
//         }
//     }

//     return null
// }

// console.log(topSalary({}))
// console.log(topSalary(salaries))

// let date = new Date(Date.parse('2012-02-20T03:12Z+03:00'))
// let now = new Date()

// console.log(date)
// console.log(now)

// async function* generateSequence(start, end) {
//     for (let i = start; i <= end; i++) {
//         await new Promise(resolve => setTimeout(resolve, 1000))

//         yield i
//     }
// }

// (async () => {
//     for await (let value of generateSequence(1, 4)) {
//         console.log(value)
//     }
// })()

// let range = {
//     from: 2, 
//     to: 4, 
//     *[Symbol.iterator]() {
//         for (let value = this.from; value <= this.to; value++) {
//             yield value
//         }
//     }
// }

// console.log(Array.from(range))

async function* fetchCommits(repo) {
    let url = `https://api.github.com/repos/${repo}/commits`

    while (url) {
        const response = await fetch(url, {
            headers: {'User-Agent': 'Our-script'}
        })

        const body = await response.json()

        let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/)
        nextPage = nextPage && nextPage[1]

        url = nextPage

        for (let commit of body) {
            yield commit
        }
    }
}

(async () => {
    let count = 0

    for await (const commit of fetchCommits('sebelousov/advego')) {
        console.log(commit.author.login)

        if (++count == 100) {
            break
        }
    }
})()