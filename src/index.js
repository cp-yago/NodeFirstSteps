// Criando meu primeiro servidor HTTP

const express = require('express')

const app = express()

app.get('/', (request, response) => {
  return response.json({message: 'Hello Yago!'})
})

app.listen(3334)

