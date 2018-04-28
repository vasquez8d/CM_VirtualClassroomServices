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
  'get /user/enable/:user_id': {
    controller: 'UserController',
    action: 'enable',
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
  'get /user/listteachers': {
    controller: 'UserController',
    action: 'listteachers',
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
  * routes AuthMail                                                          *
  ***************************************************************************/
  'get /emailauth/gencode/:user_mail': {
    controller: 'ValidateMailController',
    action: 'validatemailwoauth',
    cors: {
      origin: '*'
    }
  },
  /***************************************************************************
  * routes Category                                                          *
  ***************************************************************************/
  'get /corcategory/list': {
    controller: 'CategoryCourseController',
    action: 'list',
    cors: {
      origin: '*'
    }
  },
  'get /corcategory/listadvance': {
  controller: 'CategoryCourseController',
    action: 'listadvance',
    cors: {
    origin: '*'
    }
  },
  'post /corcategory/create': {
    controller: 'CategoryCourseController',
    action: 'create'
  },
  'post /corcategory/update': {
    controller: 'CategoryCourseController',
    action: 'update'
  },
  'get /corcategory/details/:cat_cor_id': {
    controller: 'CategoryCourseController',
    action: 'details'
  },
  'get /corcategory/delete/:cat_cor_id': {
    controller: 'CategoryCourseController',
    action: 'delete'
  },
  'get /corcategory/enable/:cat_cor_id': {
    controller: 'CategoryCourseController',
    action: 'enable'
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
  'post /course/updatefilename': {
    controller: 'CourseController',
    action: 'updatefilename'
  },
  'get /course/delete/:cor_id': {
    controller: 'CourseController',
    action: 'delete'
  },
  'get /course/enable/:cor_id': {
  controller: 'CourseController',
    action: 'enable'
  },
  'get /course/list': {
    controller: 'CourseController',
    action: 'list'
  },
  'get /course/listdashboard': {
    controller: 'CourseController',
    action: 'listdashboard'
  },
  'get /course/listuserxcourse/:cor_id': {
    controller: 'CourseController',
    action: 'listuserxcourse'
  },  
  'get /course/listdashboardfree': {
    controller: 'CourseController',
    action: 'listdashboardfree'
  },
  'get /course/listxuser/:user_id': {
    controller: 'CourseController',
    action: 'listxuser'
  },
  'get /course/details/:cor_id': {
    controller: 'CourseController',
    action: 'details'
  },
  'get /course/detailsupdate/:cor_id': {
    controller: 'CourseController',
    action: 'detailsupdate'
  },
  'get /course/listcateg/:cat_cor_id': {
    controller: 'CourseController',
    action: 'listcateg'
  },
  'post /course/uploadimage': {
    controller: 'CourseController',
    action: 'uploadimage',
    cors: {
      origin: '*'
    }
  },
  /***************************************************************************
   * routes Class                                                             *
  ***************************************************************************/
  'post /class/create': {
    controller: 'ClassController',
    action: 'create'
  },
  'post /class/update': {
    controller: 'ClassController',
    action: 'update'
  },
  'get /class/listxcourse/:cor_id': {
    controller: 'ClassController',
    action: 'listxcourse'
  }, 
  'get /class/listxcoursestart/:cor_id': {
  controller: 'ClassController',
    action: 'listxcoursestart'
},  
  'get /class/listxcourseenable/:cor_id': {
    controller: 'ClassController',
    action: 'listxcourseenable'
  },  
  'get /class/details/:class_id': {
    controller: 'ClassController',
    action: 'details'
  },
  'get /class/delete/:class_id': {
    controller: 'ClassController',
    action: 'delete'
  },
  'get /class/enable/:class_id': {
    controller: 'ClassController',
    action: 'enable'
  },
   /***************************************************************************
  * routes Comment                                                           *
  ***************************************************************************/
  'post /comment/create': {
    controller: 'CommentClassController',
    action: 'create'
  },
   /***************************************************************************
  * routes Response Comment                                                  *
  ***************************************************************************/
  'post /response/create': {
    controller: 'ResponseCommentClassController',
    action: 'create'
  },
  /***************************************************************************
  * routes Matriculas                                                        *
  ***************************************************************************/
  'get /mat/list': {
    controller: 'MatCourseController',
    action: 'list'
  },
  'get /mat/details/:mat_id': {
    controller: 'MatCourseController',
    action: 'details'
  },
  'get /mat/approve/:mat_id': {
    controller: 'MatCourseController',
    action: 'approve'
  },
  'get /mat/disapprove/:mat_id': {
    controller: 'MatCourseController',
    action: 'disapprove'
  },
  'post /mat/create': {
    controller: 'MatCourseController',
    action: 'create'
  }, 
  'post /mat/createfree': {
    controller: 'MatCourseController',
    action: 'createfree'
  },
  'post /mat/uploadimage': {
    controller: 'MatCourseController',
    action: 'uploadimage',
    cors: {
      origin: '*'
    }
  },
  /***************************************************************************
  * routes Questions                                                         *
  ***************************************************************************/
  'post /questions/upload': {
    controller: 'QuestionsController',
    action: 'upload',
    cors: {
      origin: '*'
    }
  },
  'post /questions/update': {
    controller: 'QuestionsController',
    action: 'update',
    cors: {
      origin: '*'
    }
  },
  'get /questions/listuploads': {
    controller: 'QuestionsController',
    action: 'listuploads'
  },
  'get /questions/listuploadsdetails/:data_id': {
    controller: 'QuestionsController',
    action: 'listuploadsdetails'
  },
  'get /questions/disableupload/:data_id': {
    controller: 'QuestionsController',
    action: 'disableupload'
  },
  'get /questions/enableupload/:data_id': {
    controller: 'QuestionsController',
    action: 'enableupload'
  },
  'get /questions/disableuploaddet/:data_id/:ques_id': {
    controller: 'QuestionsController',
    action: 'disableuploaddet'
  },
  'get /questions/enableuploaddet/:data_id/:ques_id': {
    controller: 'QuestionsController',
    action: 'enableuploaddet'
  },
  'get /questions/uploaddetails/:data_id/:ques_id': {
    controller: 'QuestionsController',
    action: 'uploaddetails'
  },
  /***************************************************************************
  * routes Test                                                              *
  ***************************************************************************/ 
  'post /test/create': {
    controller: 'TestController',
    action: 'create',
    cors: {
      origin: '*'
    }
  },
  'post /test/finalize': {
    controller: 'TestController',
    action: 'finalize',
    cors: {
      origin: '*'
    }
  }, 
  'post /test/test': {
    controller: 'TestController',
    action: 'test',
    cors: {
      origin: '*'
    }
  },
};
