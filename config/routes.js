/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  /***************************************************************************
  * routes User                                                              *
  ***************************************************************************/
  'post /user/login':{
    controller: 'UserController',
    action: 'login',
    cors: {
      origin: '*'
    }
  },
  'post /user/usermailprovider' : {
    controller: 'UserController',
    action: 'checkuserprovider',
    cors: {
      origin: '*'
    }
  },
  'post /user/create':{
    controller: 'UserController',
    action: 'create',
    cors: {
      origin: '*'
    }
  },
  'post /user/createwo': {
    controller: 'UserController',
    action: 'createwoauth',
    cors: {
      origin: '*'
    }
  },
  'get /user/userauth' : {
    controller: 'UserController',
    action: 'userauth',
    cors: {
      origin: '*'
    }
  },
  'post /user/update':{
    controller: 'UserController',
    action: 'update',
    cors: {
      origin: '*'
    }
  },
  'get /user/delete/:user_id': {
    controller: 'UserController',
    action: 'delete',
    cors: {
      origin: '*'
    }
  },
  'get /user/list':{
    controller: 'UserController',
    action: 'list',
    cors: {
      origin: '*'
    }
  },
  'get /user/details/:user_id':{
    controller: 'UserController',
    action: 'details',
    cors: {
      origin: '*'
    }
  },
  'get /user/detailsupdate/:user_id':{
    controller: 'UserController',
    action: 'detailsupdate',
    cors: {
      origin: '*'
    }
  },
  'get /useracademy/detailsacademyupdate/:user_id':{
    controller: 'UserAcademyController',
    action: 'detailsacademyupdate',
    cors: {
      origin: '*'
    }
  },
  /***************************************************************************
  * routes Course                                                            *
  ***************************************************************************/
  'get /emailauth/gencode/:user_mail': {
    controller: 'ValidateMailController',
    action: 'validatemailwoauth',
    cors: {
      origin: '*'
    }
  },
  /***************************************************************************
  * routes Course                                                            *
  ***************************************************************************/
  'post /course/create': {
    controller: 'CourseController',
    action: 'create'
  },
  'post /course/update': {
    controller: 'CourseController',
    action: 'update'
  },
  'get /course/delete/:cor_id': {
    controller: 'CourseController',
    action: 'delete'
  },
  'get /course/list': {
    controller: 'CourseController',
    action: 'list'
  },
  'get /course/details/:cor_id': {
    controller: 'CourseController',
    action: 'details'
  },
  'get /course/listcateg/:cat_cor_id': {
    controller: 'CourseController',
    action: 'listcateg'
  },
};
