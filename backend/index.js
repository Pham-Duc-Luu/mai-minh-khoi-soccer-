const express = require('express')
const getPlayer = require('./v1/getPlayer')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

dotenv.config();

const port = process.env.PORT || 5050

const app = express()
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// ...

app.use('/v1', getPlayer)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

