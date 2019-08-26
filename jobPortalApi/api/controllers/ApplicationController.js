/**
 * ApplicationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  async create(req, res) {
    try {
      let {
        name,
        email,
        jobId
      } = req.allParams();
      if (!name) {
        return res.badRequest({
          err: "name is required"
        });
      }
      if (!email) {
        return res.badRequest({
          err: "email is required"
        });
      }
      if (!jobId) {
        return res.badRequest({
          err: "job details is required"
        });
      }

      const candidate = await Candidate.create({
        name,
        email
      }).fetch();
      const app = await Application.create({
        job: jobId,
        candidate: candidate.id,
      }).fetch();
      return res.ok(app);

    } catch (err) {
      return res.serverError(err);
    }
  },

  async find(req, res) {
    try {
      const app = await Application.find()
        .populate("job")
        .populate('candidate');
      return res.ok(app);
    } catch (err) {
      return res.serverError(err);
    }
  }


};
