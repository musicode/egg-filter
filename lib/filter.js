'use strict'

function string(value) {
  let type = typeof value
  if (type === 'string') {
    return value
  }
  else if (type === 'number') {
    return '' + value
  }
  return ''
}

function number(value) {
  value = +value
  return isNaN(value) ? '' : value
}

function trim(value) {
  value = string(value)
  return value ? value.trim() : value
}

function upper(value) {
  value = string(value)
  return value ? value.toUpperCase() : value
}

function lower(value) {
  value = string(value)
  return value ? value.toLowerCase() : value
}

class Filter {

  constructor() {
    this.filters = {
      string,
      number,
      trim,
      upper,
      lower,
    }
  }

  add(name, handler) {
    this.filters[name] = handler
  }

  handle(data, filters) {
    let result = { }
    for (let key in filters) {
      let value = data[key]
      let filter = filters[key]

      switch (typeof filter) {
        case 'string':
          value = this.filters[filter](value)
          break
        case 'object':
          for (let i = 0, len = filter.length; i < len; i++) {
            value = this.filters[filter[i]](value)
            if (value === '') {
              break
            }
          }
          break
        case 'function':
          value = filter(value)
          break
        default:
          throw new Error(`filter ${key} is wrong.`)
      }
      result[key] = value
    }
    return result
  }

}

module.exports = Filter