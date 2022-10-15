const express = require('express')
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator')

const app = express()
const port = 3000


//SET TEMPLATING ENGINE
app.set('view engine', 'ejs')

const urlencodedParser = bodyParser.urlencoded({ extended: false})

//NAVIGATION
app.get('', (req, res) => {
    res.render('index')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', urlencodedParser, [
    check('username', 'This username must be 3+ character long')
    .exists()
    .isLength({ min: 3 }),
    check('email', 'Email is not valid')
    .isEmail()
    .normalizeEmail()
], (req, res) => {
    
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        // return res.status(422).jsonp(errors.array())

        const alert = errors.array()
        res.render('register', {
            alert
        })
    }
})

app.listen(port, () => console.info(`App Listening on port: ${port}`))