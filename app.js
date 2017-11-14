'use strict'

const Filter = require('./lib/filter')

module.exports = function (app) {
  app.filter = new Filter()
}
