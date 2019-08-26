/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const Joi = require('@hapi/joi');


module.exports = {


  /**
   * `UserController.signup()`
   */
  signup: async function (req, res) {
    try {
      const schema = Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required()
      });

      //validate all params
      const {
        email,
        password
      } = await Joi.validate(req.allParams(), schema);
      const encryptedPassword = await UtilService.hashPassword(password);

      //create user
      const user = await User.create({
          email,
          password: encryptedPassword
        })
        .fetch();
      return res.ok(user)
    } catch (err) {
      if (err.name === 'ValidationError') {
        return res.badRequest(err)
      }
      return res.serverError(err);
    }
  },

  /**
   * `UserController.login()`
   */
  login: async function (req, res) {
    try {
      const schema = Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required()
      });

      //validate all params
      const {
        email,
        password
      } = await Joi.validate(req.allParams(), schema);
      const user = await User.findOne({
        email
      });
      if (!user) {
        return res.notFound({
          err: "User does not exist"
        })
      }
      const matchedPassword = await UtilService.hashPassword(password, user.password)
      if (!matchedPassword) {
        return res.badRequest({
          err: "Invalid Password..."
        })
      }
      const token = JwtService.issuer({
        user: user.id
      }, '1 day');
      return res.ok({
        token
      })

    } catch (err) {
      if (err === 'ValidationError') {
        res.badRequest(err)
      }
      return res.serverError(err);
    }
  }

};
