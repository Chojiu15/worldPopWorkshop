const express = require('express')
const connexion = require('./conf')
const cors = require('cors')
const BodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(express.json())
app.use(BodyParser.urlencoded({
    extended : true
}))

app.use(cors())

app.get('/api/populations', (req, res) =>{
    connexion.query(`SELECT * FROM population_years WHERE country = 'Angola'`, (err, results) =>{
        if(err) throw err
        res.send(results)
    })
})

app.get('/api/populations/:country', (req, res) =>{
    const idCountry = req.params.country
    connexion.query(`SELECT * FROM population_years WHERE country = ?`, idCountry, (err, results) =>{
        if(err) throw err
        res.send(results)
    } )
})

app.post('/api/populations', (req, res) =>{
    const formData = req.body
    connexion.query(`INSERT INTO population_years SET ?`, formData, (err, results) =>{
        if(err) throw err
        res.send('OK')
    })
})

app.delete('/api/populations/:country', (req, res) =>{
    const idCountry = req.params.country
    connexion.query(`DELETE FROM population_years WHERE country = ?`, idCountry, (err, results) =>{
        if(err) throw err
        res.send(`Data deleted`)
    })
})

app.put('/api/populations/:country', (req, res) =>{
    const formData = req.body
    const idCountry = req.params.country
    connexion.query(`UPDATE population_years SET ? WHERE country = ?`, [formData, idCountry], (err, results) =>{
        if(err) throw err
        res.send(`Data updated`)
    })
})


app.listen(port, console.log(`Server is running on port ${port}`))