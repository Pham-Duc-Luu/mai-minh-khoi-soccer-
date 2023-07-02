const pool = require('../config/pgConfig.js')

const getPlayer = async (req, res) => {
    try {
        pool.query('select * from coach ', (error, results) => {
            if (error) {
              throw error
            }

             res.status(200).json({ data:  results.rows})
          })
        // console.log(123);
        res.status(200).json({code:1})
    } catch (error) {
        
    }
}
 
module.exports = { getPlayer} 