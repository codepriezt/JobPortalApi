/**
 * CompanyController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  /**
   * `CompanyController.create()`
   */
  async create(req, res) {
    try {
      //let get the name of all params 
      const params = req.allParams();
      if (!params.name) {
        return res.badRequest({
          err: "name is required"
        })
      }
      //create a new record in company 
      const results = await Company.create({
        name: params.name,
        address: params.address,
        city: params.city,
        user: req.user
      });
      return res.ok(results);
    } catch (err) {
      return res.serverError(err)
    }


  },
  /**
   * `CompanyController.find()`
   */
  async find(req, res) {
    try {
      const companies = await Company.find().populate('jobs');
      return res.ok(companies)
    } catch (err) {
      return res.serverError(err);
    }
  },


  /**
   * `CompanyController.findOne()`
   */
  async findOne(req, res) {
    try {
      const company = await Company.findOne({
        id: req.params.id
      });
      return res.ok(company)
    } catch (err) {
      return res.serverError(err)
    }
  },

  /**
   * `CompanyController.udate()`
   */
  async update(req, res) {
    try {
      let params = req.allParams()
      let attributes = {}
      if (params.name) {
        attributes.name = params.name
      }
      if (params.address) {
        attributes.address = params.address
      }
      if (params.city) {
        attributes.city = params.city
      }

      const result = await Company.update({
        id: req.params.id
      }, attributes)
      return res.ok(result)
    } catch (err) {
      return res.serverError(err)
    }
  },

  /**
   * `CompnanyController.delete()`
   */
  async delete(req, res) {
    try {
      const results = await company.destroy({
        id: req.params.id
      })
      return res.ok(results)
    } catch (err) {
      return res.serverError(err)
    }
  }
}
