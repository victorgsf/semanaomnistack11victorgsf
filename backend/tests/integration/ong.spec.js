const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback()
        await connection.migrate.latest()
    })

    afterAll( async () => {
        await connection.destroy()
    } )

    it('should to be able to crate a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "ONG DO VICTOR 2",
	            email: "contato@email.com",
	            whatsapp: "31000000000",
	            city: "Sete Lagoas",
	            uf: "MG"
            })
            console.log(response.body)
        expect(response.body).toHaveProperty('id')
        expect(response.body.id).toHaveLength(8)
    })
})
