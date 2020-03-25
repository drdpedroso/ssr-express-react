const express = require('express')
const cors = require('cors')
const http = require('http')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use(express.static('images'))

const safeRouter = express.Router()

const isPasswordValid = (password = '') => {
    return password.length === 6 && /^[0-9]+$/.test(password)
}

const isEmailValid = (email = '') => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const isTokenValid = (token = "") => {
    const regex = /^([a-zA-Z0-9 _-]+)$/;
    return token.length === 16 && regex.test(token);
};

const authMiddleware = (req, res, next) => {
    if (isTokenValid(req.headers.authorization)) {
        next();
    } else {
        res.status(401).send({ message: "Token inválido!" });
    }
};

const generateToken = () => {
    const chars =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 16; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)];
    return result;
};

app.post('/login', function (req, res) {
    if (isPasswordValid(req.body.password) && isEmailValid(req.body.email)) {
        res.send({
            token: generateToken()
        })
    } else {
        res.status(400).send({
            message: "Campos inválidos"
        })
    }
})

safeRouter.use(authMiddleware);

safeRouter.get("/crypto/btc", (req, res) => {
    const { id } = req.params;
    http.get(
        "http://api.tvmaze.com/shows/" + id,
        {
            headers: {
                "Content-Type": "application/json"
            }
        },
        response => {
            let data = "";
            response.on("data", chunk => {
                data += chunk;
            });
            response.on("end", () => {
                const body = JSON.parse(data);
                res.send({ show: body });
            });
        }
    );
});


app.use(safeRouter)

app.use(function(req, res){
    res.status(404)
    res.send({"message": "Endpoint não encontrado"});
});

app.listen(3001, function () {
    console.log('Ouvindo a porta 3001!')
})