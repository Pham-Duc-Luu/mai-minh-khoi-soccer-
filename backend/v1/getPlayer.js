const express = require('express')
const { getPlayer } = require('../controller/getPlayer')
const router = express.Router()

router.get('/getPlayer', getPlayer)

module.exports = router
