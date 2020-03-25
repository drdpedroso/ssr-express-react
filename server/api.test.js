const request = require('supertest')

const isTokenValid = (token = "") => {
    const regex = /^([a-zA-Z0-9 _-]+)$/;
    return token.length === 16 && regex.test(token);
};

const currenciesMock = {
    "BRL": "5.400",
    "EUR": "0.920",
    "CAD": "1.440"
}

describe('/login', () => {
    test('should return valid token when email and password are correct', () => {
        return request('http://localhost:3001').post("/login").send({email: 'email@mail.com', password: '123456'}).then(response => {
            expect(response.statusCode).toBe(200)
            expect(isTokenValid(response.body.token)).toBe(true)
        })
    });
    test('should return 400 and invalid fields message when email and password are incorrect', () => {
        return request('http://localhost:3001').post("/login").send({email: 'email@.com', password: '12345'}).then(response => {
            expect(response.statusCode).toBe(400)
            expect(response.body.message).toBe('Campos inválidos')
        })
    });
    test('should return 400 and invalid fields message when only email is incorrect', () => {
        return request('http://localhost:3001').post("/login").send({email: 'email@.com', password: '123456'}).then(response => {
            expect(response.statusCode).toBe(400)
            expect(response.body.message).toBe('Campos inválidos')
        })
    });
    test('should return 400 and invalid fields message when only password is incorrect', () => {
        return request('http://localhost:3001').post("/login").send({email: 'email@mail.com', password: '1234A'}).then(response => {
            expect(response.statusCode).toBe(400)
            expect(response.body.message).toBe('Campos inválidos')
        })
    });
})

describe('general', () => {
    test('should return 404 when endpoint does not exist', () => {
        return request('http://localhost:3001').get("/endpoint").then(response => {
            expect(response.statusCode).toBe(404)
            expect(response.body.message).toBe('Endpoint não encontrado')
        })
    });
})
describe('/crypto/btc', () => {
    test('should return correct index for currencies', () => {
        return request('http://localhost:3001').get("/crypto/btc").set('Authorization', 'I8iFvrXDQITNoYaa').then(response => {
            const res = JSON.parse(response.text)
            expect(response.statusCode).toBe(200)
            expect(res.bpi.BTC.code).toBe('BTC')
            const usdRate = res.bpi.USD.rate_float * Number(currenciesMock.BRL)
            const eurRate = res.bpi.USD.rate_float * Number(currenciesMock.EUR)
            const cadRate = res.bpi.USD.rate_float * Number(currenciesMock.CAD)
            expect(res.bpi.USD.code).toBe('USD')
            expect(res.bpi.BRL.rate_float).toBe(usdRate)
            expect(res.bpi.EUR.rate_float).toBe(eurRate)
            expect(res.bpi.CAD.rate_float).toBe(cadRate)
        })
    });
    test('should return 401 if token is invalid', () => {
        return request('http://localhost:3001').get("/crypto/btc").set('Authorization', 'token').then(response => {
            expect(response.statusCode).toBe(401)
        })
    });

    test('should return correct values after post request', () => {
        const agent = request('http://localhost:3001')
        return agent.post("/crypto/btc").set('Authorization', 'I8iFvrXDQITNoYaa').send({ "value": 20000.0000 }).then(response => {
            expect(response.statusCode).toBe(200)
            expect(response.body.message).toBe("Valor alterado com sucesso!")
            agent.get("/crypto/btc").set('Authorization', 'I8iFvrXDQITNoYaa').then(res => {
                expect(response.statusCode).toBe(200)
                expect(res.bpi.USD.rate_float).toBe(20000.0000)
                const usdRate = res.bpi.USD.rate_float * Number(currenciesMock.BRL)
                const eurRate = res.bpi.USD.rate_float * Number(currenciesMock.EUR)
                const cadRate = res.bpi.USD.rate_float * Number(currenciesMock.CAD)
                expect(res.bpi.USD.code).toBe('USD')
                expect(res.bpi.BRL.rate_float).toBe(usdRate)
                expect(res.bpi.EUR.rate_float).toBe(eurRate)
                expect(res.bpi.CAD.rate_float).toBe(cadRate)
            })
        })
    });

    test('should return correct values after post request', () => {
        const agent = request('http://localhost:3001')
        return agent.post("/crypto/btc").set('Authorization', 'I8iFvrXDQITNoYaa').send({ empty: 'body' }).then(response => {
            expect(response.statusCode).toBe(400)
            expect(response.body.message).toBe("Valor inválido")

        })
    });
})