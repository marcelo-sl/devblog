'use strict'

const Comment = use('App/Models/Comment');

class CommentController {
    async store({ auth, request, params }) {
        const { content } = request.all();
        const user_id = auth.user.id;
        const post_id = params.postId;

        const newComment = await new Comment();
        newComment.content = content;
        newComment.user_id = user_id;
        newComment.post_id = Number(post_id);

        await newComment.save();

        return newComment;
    }
    
    async update({ auth, params, request, response}) {
        const  comment_id = params.id;
        const data = request.only(['content']);
        const user_id = auth.user.id;

        const comment = await Comment.query()
          .where('id', comment_id)
          .firstOrFail()

        if(comment.user_id !== user_id) return response.status(403).json({ error: 'This is not your comment!!' });

        comment.merge(data);

        await comment.save();

        return comment;
    }

    async destroy({ auth, params, response }) {
        const comment_id = params.id;
        const user_id = auth.user.id;

        const comment = await Comment
          .query()
          .where('id', comment_id)
          .firstOrFail()

        if(comment.user_id !== user_id) return response.status(403).json({ error: 'This is not your comment!!' });

        comment.delete();

        return response.status(204).send();
    }
}

module.exports = CommentController
