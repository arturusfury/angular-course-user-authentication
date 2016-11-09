/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  signup: function(req, res) {
    console.log('Backend Signup');

    var Passwords = require('machinepack-passwords');

    Passwords.encryptPassword({
      password: req.param('password'),
      difficulty: 10,
    }).exec({
      error: function(err) {
        return res.negotiate(err);
      },
      success: function(encryptedPassword) {
        require('machinepack-gravatar').getImageUrl({
          emailAddress: req.param('email')
        }).exec({
          error: function(err) {
            return res.negotiate(err);
          },
          success: function(gravatarUrl) {
            User.create({
              name: req.param('name'),
              email: req.param('email'),
              password: encryptedPassword,
              lastLoggedIn: new Date(),
              gravatarUrl: gravatarUrl
            }, function userCreated(err, newUser) {
              if (err) {
                console.log('Error: ' + err);
                return res.negotiate(err);
              }

              // Session Variable

              return res.json({
                id: newUser.id
              });
            })
          }
        })
      }
    })
  },
  login: function(req, res) {
    User.findOne({
      email: req.param('email')
    }, function foundUser(err, user) {
      if (err) {
        return res.negotiate(err);
      }
      if (!user) {
        return res.notFound();
      }

      require('machinepack-passwords').checkPassword({
        passwordAttempt: req.param('password'),
        encryptedPassword: user.password
      }).exec({
        error: function(err) {
          return
        },
        incorrect: function() {
          return res.notFound();
        },
        success: function () {
          req.session.me = user.id;
          console.log('Success: ' + user.id);
          return res.ok();
        }
      })
    })
  }
};
