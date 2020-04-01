'use strict'

const User = use('App/Models/User');

class ProfileController {
    async show({ auth, params, response }) {
        if(auth.user.id !== Number(params.id)) {
            return response.status(403).json({ error: 'This is not your profile!' });
        } 

        const user = await User.find(auth.user.id);

        return response.json(user);
    }

    async update({ auth, params, request, response }) {
        if(auth.user.id !== Number(params.id)) {
            return response.status(403).json({ error: 'This is not your profile' });
        }
        
        const { name, bio, github, linkedin } = await request.all();

        const user = await User.find(auth.user.id);

        user.name = name;
        user.bio = bio;
        user.github = github;
        user.linkedin = linkedin;

        await user.save();

        return response.json(user);
    }
}

module.exports = ProfileController
