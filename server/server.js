require('./db/connection')
const cors = require('cors')
const router = require('./routes/router');
const express = require('express');
const cookieParser = require('cookie-parser')

const app = express();
const port = 8000

app.use(express.json())
app.use(cookieParser())
app.use(cors())                      // Cross-origin resource sharing.
app.use(router)

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, ()=>{
    console.log(`Server has been initiated at http://localhost:${port}`)
})