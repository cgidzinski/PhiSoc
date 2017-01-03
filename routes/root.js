var DB = require('../models/models');
module.exports = function(app, passport) {
        // app.use(function (req, res, next) {
        //   if (!req.user){
        //     req.user = false;
        //  }
        //   next();
        // });
        // =============================================================================
        // ROOT ========================================================================
        // =============================================================================
        app.get('/', function(req, res) {
            DB.Home.findOne({}, function(err, home) {
                res.render('index.ejs', {
                    user: req.user,
                    home: home
                });
            });
        });
        //
        app.post('/updatehome', isLoggedIn, isAdmin, function(req, res) {
            DB.Home.findOne({}, function(err, home) {
                if (!!home) {
                    home.title = req.body.title;
                    home.body = req.body.body;
                    home.img = req.body.img;
                    home.save();
                } else {
                    var newHome = new DB.Home();
                    newHome.title = req.body.title;
                    newHome.body = req.body.body;
                    newHome.img = req.body.img;
                    newHome.save();
                }
                res.render('webcms.ejs', {
                    user: req.user
                });
            });
        });
        //        



app.get('/positions', function(req, res) {
            DB.Position.find({}, function(err, positions) {
                res.render('positions.ejs', {
                    user: req.user,
                    positions: positions
                });
            });
        });
        app.post('/newposition', isLoggedIn, isAdmin, function(req, res) {
            var newPosition = new DB.Position();
            newPosition.title = req.body.title;
            newPosition.body = req.body.body;
            newPosition.date = Date.now();
            newPosition.save();
            res.render('webcms.ejs', {
                user: req.user
            });
        });
        app.get('/delposition/:id', function(req, res) {
            DB.Position.findOne({ _id: req.params.id }, function(err, position) {
                position.remove();
                res.redirect("/positions");
            });
        });









        //
        app.get('/about', function(req, res) {
            DB.About.findOne({}, function(err, about) {
                res.render('about.ejs', {
                    user: req.user,
                    about: about
                });
            });
        });
        //
        app.post('/updateabout', isLoggedIn, isAdmin, function(req, res) {
            DB.About.findOne({}, function(err, about) {
                if (!!about) {
                    about.body = req.body.body;
                    about.save();
                } else {
                    var newAbout = new DB.About();
                    newAbout.body = req.body.body;
                    newAbout.save();
                }
                res.render('webcms.ejs', {
                    user: req.user
                });
            });
        });
        app.get('/post/:url', function(req, res) {
            DB.Post.findOne({ url: req.params.url }, function(err, post) {
                res.render('post.ejs', {
                    user: req.user,
                    post: post
                });
            });
        });
        app.get('/delpost/:url', function(req, res) {
            DB.Post.findOne({ url: req.params.url }, function(err, post) {
                post.remove();
                res.redirect("/");
            });
        });
        app.get('/delcom/:url/:id', function(req, res) {
            DB.Post.findOne({ url: req.params.url }, function(err, post) {
                for (var i = post.comments.length - 1; i >= 0; i--) {
                    if (post.comments[i]._id == req.params.id) {
                        post.comments.splice(i, 1)
                        post.save();
                        break;
                    }
                }
                res.redirect("/post/" + req.params.url);
            });
        });
        //
        app.post('/post/:url', function(req, res) {
            DB.Post.findOne({ url: req.params.url }, function(err, post) {
                var comment = new DB.Comment();
                comment.author = req.user.local.name;
                comment.body = req.body.body;
                comment.date = Date.now();
                comment.visible = true;
                post.comments.push(comment);
                post.save();
                res.redirect("/post/" + req.params.url);
            });
        });
        //
        app.get('/contact', isLoggedIn, function(req, res) {
            res.render('contact.ejs', {
                user: req.user
            });
        });
        app.get('/showcase', function(req, res) {
            DB.Showcase.find({}, function(err, showcase) {
                res.render('showcase.ejs', {
                    user: req.user,
                    showcase: showcase
                });
            });
        });
        app.post('/newshowcase', isLoggedIn, isAdmin, function(req, res) {
            var newShowcase = new DB.Showcase();
            newShowcase.title = req.body.title;
            newShowcase.body = req.body.body;
            newShowcase.img = req.body.img;
            newShowcase.date = Date.now();
            newShowcase.save();
            res.render('webcms.ejs', {
                user: req.user
            });
        });
        app.get('/delshowcase/:id', function(req, res) {
            DB.Showcase.findOne({ _id: req.params.id }, function(err, showcase) {
                showcase.remove();
                res.redirect("/showcase");
            });
        });
        app.get('/blog', function(req, res) {
            res.redirect("/blog/1")
        });
        app.get('/blog/:page', function(req, res) {
            DB.Post.find({}).sort('-date').limit(4).skip((req.params.page - 1) * 4).exec(function(err, posts) {
                DB.Post.count({}, function(err, count) {
                    res.render('blog.ejs', {
                        user: req.user,
                        posts: posts,
                        page: req.params.page,
                        postCount: count,
                        pageCount: Math.ceil(count / 4)
                    });
                })
            });
        });
        app.get('/webcms', isLoggedIn, isAdmin, function(req, res) {
            res.render('webcms.ejs', {
                user: req.user
            });
        });
        app.post('/newpost', isLoggedIn, isAdmin, function(req, res) {
            var newPost = new DB.Post();
            newPost.url = req.body.url;
            newPost.type = req.body.type;
            newPost.title = req.body.title;
            newPost.author = req.user.local.name;
            newPost.img = req.body.img;
            newPost.body = req.body.body;
            newPost.date = Date.now();
            newPost.save();
            res.render('webcms.ejs', {
                user: req.user
            });
        });
        // PROFILE SECTION =========================
        app.get('/profile', isLoggedIn, function(req, res) {
            var user = req.user
            user.local.password = null
            res.render('profile.ejs', {
                user: user
            });
        });
        // LOGOUT ==============================
        app.get('/logout', function(req, res) {
            req.logout();
            res.redirect('/');
        });
        // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });
        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect: '/profile', // redirect to the secure profile section
            failureRedirect: '/login', // redirect back to the signup page if there is an error
            failureFlash: true // allow flash messages
        }));
        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });
        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/profile', // redirect to the secure profile section
            failureRedirect: '/signup', // redirect back to the signup page if there is an error
            failureFlash: true // allow flash messages
        }));
    }
    // route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/');
}

function isAdmin(req, res, next) {
    if (req.user.local.permissions.indexOf("Admin") != -1) return next();
    res.redirect('/');
}
