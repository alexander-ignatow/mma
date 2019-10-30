import Express from 'express'
import createInputProcessor from './inputProcessor'

const DEFAULT_PORT = 3000
const server = Express()
const inputProcessor = createInputProcessor()

server.get('/api/mma', (req, res) => {
  try {
    const result = inputProcessor.process(req.query)
    res.status(200).send(result)
  } catch (error) {
    console.log(error)
    res.status(200).send(error)
  }
})

server.get('*', (req, res) => {
  res.status(404).send('Nothing to see here!')
})

server.listen(process.env.PORT || DEFAULT_PORT, error => {
  if (error) {
    console.log(error)
  }

  console.log('Wooooosh!')
})
