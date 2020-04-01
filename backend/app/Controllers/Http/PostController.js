'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use('Database');
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
  async index ({ response }) {
    const posts = await Database.table('posts')
      .innerJoin('users', 'users.id', 'posts.user_id')
      .select([
        'posts.*',
        'users.name as authorName',
        'users.github as authorGithub',
        'users.linkedin as authorLinkedin',
      ]);

    return response.json(posts);
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
    const [post] = await Database.table('posts')
      .innerJoin('users', 'users.id', 'posts.user_id')
      .select([
        'posts.*',
        'users.name as authorName',
        'users.github as authorGithub',
        'users.linkedin as authorLinkedin',
      ]).where('posts.id', params.id);

    if(!post) return response.status(404).json({ error: 'Post Not Found!' });

    return response.json(post);
  }

  /**
   * Update post details.
   * PUT or PATCH posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const { title, body } = request.all();

    const post = await Post.findOrFail(params.id);

    post.title = title;
    post.body = body;

    await post.save();

    return response.json(post);
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
