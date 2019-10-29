import Express from 'express'

const DEFAULT_PORT = 3000
const server = Express()

server.get('/api/mma', (req, res) => {
  res.status(200).send({
    result: 'success',
    output: {
      T: 'M',
      F: 0
    }
  })
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
