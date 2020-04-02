'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// User Guest Routes
Route.group(() => {
  // Register & Authenticate Routes
  Route.post('/register', 'AuthController.register')
  Route.post('/authenticate', 'AuthController.authenticate')

  // Post Guest Routes
  Route.get('/posts', 'PostController.index')
  Route.get('/posts/:id', 'PostController.show')
}).middleware(['guest']);

// User Authenticated Routes
Route.group(() => {
  // User Profile Routes
  Route.get('/profile/:id', 'ProfileController.show')
  Route.put('/profile/:id', 'ProfileController.update')

  // Comments Routes
  Route.post('/posts/:postId/comment/new', 'CommentController.store')
  Route.put('/comments/:id', 'CommentController.update')
  Route.delete('/comments/:id', 'CommentController.destroy')
}).middleware(['auth']);

// Administrator Routes
Route.group(() => {
  // Post Store, Update & Destroy Routes
  Route.post('/posts', 'PostController.store')
  Route.put('/posts/:id', 'PostController.update')
  Route.delete('/posts/:id', 'PostController.destroy')
}).middleware(['auth', 'is:administrator']);


