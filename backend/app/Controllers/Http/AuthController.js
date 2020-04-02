'use strict'

const User = use('App/Models/User');

class AuthController {
    async register({ request, response }) {
        const data = request.only(['email', 'name', 'password']);

        const user = await User.create(data);

        return response.status(201).json(user);
    }

    async authenticate({ auth, request }) {
        const { email, password } = request.all();
        
        const token = await auth.attempt(email, password);

        return token;
    }
}

module.exports = AuthController
