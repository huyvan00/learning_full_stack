let count = 0
setInterval(() => console.log(`${++count}`), 1000)

setTimeout(() => {
    console.log('hellow from  the past')
    process.exit
})