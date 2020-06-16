// Criando meu primeiro servidor HTTP
const express = require('express')
const cors = require('cors')

const {uuid, isUuid} = require('uuidv4')

app.use(cors())
const app = express()

//informar para o app que ele irá entende o formato json
app.use(express.json())

const projects = []

//middleware
function logRequests(request, response, next){
  const { method, url } = request
  const logLabel = `[${method.toUpperCase()}] ${url}`
  console.log(logLabel)

  return next()
}

function validadeProjectId(request, response, next){
  const { id } = request.params
  if (!isUuid(id)){
    return response.status(400).json({error: 'invalid project id.'})
  }
  return next()
}

app.use(logRequests)
//Outra forma de utilizar os middlewares
// app.use('/projects/:id', validadeProjectId)

app.get('/projects',(request, response) => {
  const { title } = request.query

  const results = title 
    ? projects.filter(project => project.title.includes(title))
    : projects

  return response.json(results)
})

app.post('/projects', (request, response) => {
  const {title, owner} = request.body

  const project ={ id: uuid(), title, owner}

  projects.push(project)

  return response.json(project)
})

app.put('/projects/:id', validadeProjectId, (request, response) => {
  const {id} = request.params
  const {title, owner} = request.body

  const projectIndex = projects.findIndex(project => project.id === id)

  if (projectIndex < 0) {
    return response.status(400).json({error: 'Project not found'})
  }

  const project ={
    id,
    title,
    owner
  }

  projects[projectIndex] = project

  return response.json(project)
})

app.delete('/projects/:id', validadeProjectId, (request, response) => {
  const {id} = request.params

  const projectIndex = projects.findIndex(project => project.id === id)

  if (projectIndex < 0) {
    return response.status(400).json({error: 'Project not found'})
  }

  projects.splice(projectIndex,1)

  return response.status(204).send()
})

app.listen(3333, () => {
  console.log('Back-end started!')
})

