'use strict'

module.exports = {

  filter(data, filters) {
    return this.app.filter.handle(data, filters)
  }

}
