'use strict'

const User = use('App/Models/User');

class ProfileController {
    async show({ auth, params }) {
        if(auth.user.id !== Number(params.id)) {
            return response.status(403).json({ error: 'This is not your profile!' });
        } 

        const user = await User.find(auth.user.id);

        return user;
    }

    async update({ auth, params, request }) {
        if(auth.user.id !== Number(params.id)) {
            return response.status(403).json({ error: 'This is not your profile' });
        }
        
        const data = await request.only(['name', 'bio', 'github', 'linkedin']);

        const user = await User.find(auth.user.id);

        user.merge(data);

        await user.save();

        return user;
    }
}

module.exports = ProfileController
