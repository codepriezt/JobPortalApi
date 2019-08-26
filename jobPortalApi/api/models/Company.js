module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    address: {
      type: 'string'

    },
    city: {
      type: 'string'

    },

    jobs: {
      collection: 'Job',
      via: 'company'
    },

    user: {
      model: User,
      columnName: userId,
      required: true
    }
  }
}