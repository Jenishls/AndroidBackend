const axios = require('axios')
const auth = 'http://localhost:7000/api/auth/'
const group = 'http://localhost:7000/api/groups/'
const user = 'http://localhost:7000/api/users/'

describe('Automated Testing', () => {

    it('Register a user', async () => {
        return axios.post(auth + 'register', {
                'name': 'Mike Arlong',
                'email': 'mike@local.com',
                'password': 'password'

            })
            .then(data => expect(data.data.status).toEqual("true"))
    })

    it('Login of a user', async () => {
        return axios.post(auth + 'login', {
                'email': 'mike@local.com',
                'password': 'password'
            })
            .then(data => expect(data.data.status).toEqual("true"))
    })

    it('Fetch all groups of a user', async () => {
        return axios.get(group + '27', {
                headers: {
                    "Authorization": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5AbG9jYWwuY29tIiwiaWF0IjoxNTYyNjM5NjgyfQ.U_bhGsXUw2Etkw7uL5_ymIxr-8eO-jFFhm2JjjHj6qs'
                }
            })
            .then(data => expect(data.data[0].id).toEqual(77))
    })

    it('Fetch a group', async () => {
        return axios.get(group + 'unit/48', {
                headers: {
                    "Authorization": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5AbG9jYWwuY29tIiwiaWF0IjoxNTYyNjM5NjgyfQ.U_bhGsXUw2Etkw7uL5_ymIxr-8eO-jFFhm2JjjHj6qs'
                }
            })
            .then(data => expect(data.data[0].id).toEqual(48))
    })

    it('Fetch a user', async () => {
        return axios.get(user + 'profile/27', {
                headers: {
                    "Authorization": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5AbG9jYWwuY29tIiwiaWF0IjoxNTYyNjM5NjgyfQ.U_bhGsXUw2Etkw7uL5_ymIxr-8eO-jFFhm2JjjHj6qs'
                }
            })
            .then(data => expect(data.data[0].id).toEqual(27))
    })



})