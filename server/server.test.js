const request = require('supertest')

describe('/', () => {
    test('should return correct structure for html with correct test-ids', () => {
        return request('http://localhost:3000').get("/").then(response => {
            expect(response.statusCode).toBe(200)
            const textResponse = response.text
            expect(textResponse.includes('data-testid="btc-label"')).toBe(true)
            expect(textResponse.includes('data-testid="usd-label"')).toBe(true)
            expect(textResponse.includes('data-testid="brl-label"')).toBe(true)
            expect(textResponse.includes('data-testid="cad-label"')).toBe(true)
        })
    })
})

describe('/login', () => {
    test('should return correct structure for html with correct test-ids', () => {
        return request('http://localhost:3000').get("/login").then(response => {
            expect(response.statusCode).toBe(200)
            const textResponse = response.text
            expect(textResponse.includes('data-testid="email-input"')).toBe(true)
            expect(textResponse.includes('data-testid="password-input"')).toBe(true)
            expect(textResponse.includes('data-testid="login-btn"')).toBe(true)
        })
    })
})