'use strict'

const Role = use('Adonis/Acl/Role');
const Permission = use('Adonis/Acl/Permission');

const User = use('App/Models/User');

class AdministratorSeeder {
  async run () {
    const roleAdmin = new Role();
    roleAdmin.name = 'Administrator';
    roleAdmin.slug = 'administrator';
    roleAdmin.description = 'manage adminstration privileges';
    await roleAdmin.save();

    const user = await User.find(1);
    await user.roles().attach([roleAdmin.id]);

    const createPostsPermission = new Permission();
    createPostsPermission.slug = 'create_posts';
    createPostsPermission.name = 'Create Posts';
    createPostsPermission.description = 'create posts permission';
    await createPostsPermission.save();

    const updatePostsPermission = new Permission();
    updatePostsPermission.slug = 'update_posts';
    updatePostsPermission.name = 'Update Posts';
    updatePostsPermission.description = 'update posts permission';
    await updatePostsPermission.save();

    const deletePostsPermission = new Permission();
    deletePostsPermission.slug = 'delete_posts';
    deletePostsPermission.name = 'Delete Posts';
    deletePostsPermission.description = 'delete posts permission';
    await deletePostsPermission.save();

    await roleAdmin.permissions().attach([
      createPostsPermission.id,
      updatePostsPermission.id,
      deletePostsPermission.is,
    ]);

  }
}

module.exports = AdministratorSeeder
