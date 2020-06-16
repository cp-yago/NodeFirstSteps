// Criando meu primeiro servidor HTTP

const express = require('express')

const app = express()

app.get('/', (request, response) => {
  return response.json({message: 'Hello Yagoooooo!'})
})

app.listen(3334, () => {
  console.log('Back-end started!')
})

