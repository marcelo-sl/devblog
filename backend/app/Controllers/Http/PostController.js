'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Post = use('App/Models/Post');

class PostController {
  /**
   * Show a list of all posts.
   * GET posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
      const posts = await Post
        .query()
        .with('user', user => {
          user.select(
            'id',
            'name as authorName',
            'github as authorGithub',
            'linkedin as authorLinkedin',
          )
        })
        .fetch()

    return posts;
  }

  /**
   * Create/save a new post.
   * POST posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ auth, request, response }) {
    const { title, body } = request.all();
    const user_id = auth.user.id;
    
    const newPost = new Post();
    newPost.title = title;
    newPost.body = body;
    newPost.user_id = user_id;

    await newPost.save();

    return response.status(201).json(newPost);
  }

  /**
   * Display a single post.
   * GET posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  
  async show ({ params, response }) {
    const post = await Post
      .query()
      .with('user', user => {
        user.select(
          'id',
          'name as authorName',
          'github as authorGithub',
          'linkedin as authorLinkedin',
        )
      })
      .with('comments', comment => {
        comment.where('comments.post_id', params.id)
      })
      .where('id', params.id)
      .firstOrFail()

    if(post.length == 0) return response.status(404).json({ error: 'Post Not Found!' });

    return post;
  }
  

  /**
   * Update post details.
   * PUT or PATCH posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request }) {
    const data = request.only(['title', 'body']);

    const post = await Post.findOrFail(params.id);

    post.merge(data);

    await post.save();

    return post;
  }

  /**
   * Delete a post with id.
   * DELETE posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    const post = await Post.findOrFail(params.id);

    post.delete();

    return response.status(204).send();
  }
}

module.exports = PostController
