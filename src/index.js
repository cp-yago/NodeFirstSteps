// Criando meu primeiro servidor HTTP

const express = require('express')

const app = express()

//informar para o app que ele irá entende o formato json
app.use(express.json())

app.get('/projects', (request, response) => {
  const { title, owner } = request.query
  
  console.log(title, owner)

  return response.json([
    'Projeto 1',
    'Projeto 2',
  ])
})

app.post('/projects', (request, response) => {
  const {title, owner} = request.body
  console.log(title, owner)
  return response.json([
    'Projeto 1',
    'Projeto 2',
    'Projeto 3',
  ])
})

app.put('/projects/:id', (request, response) => {
  const {id} = request.params
  console.log(id)
  return response.json([
    'Projeto 4',
    'Projeto 2',
    'Projeto 3',
  ])
})

app.delete('/projects/:id', (request, response) => {
  return response.json([
    'Projeto 2',
    'Projeto 3',
  ])
})

app.listen(3334, () => {
  console.log('Back-end started!')
})

