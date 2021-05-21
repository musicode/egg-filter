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

function boolean(value) {
  if (typeof value === 'boolean') {
    return value
  }
  return ''
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

function array(value) {
  if (Array.isArray(value)) {
    return value
  }
  return ''
}

class Filter {

  constructor() {
    this.filters = {
      string,
      number,
      boolean,
      trim,
      upper,
      lower,
      array,
    }
  }

  add(name, handler) {
    this.filters[name] = handler
  }

  handle(data, filters) {
    let result = { }
    for (let key in filters) {
      let value = data[key]
      if (value != null) {
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
            throw new Error(`[egg-filter] filter "${key}" is wrong.`)
        }
        result[key] = value
      }
    }
    return result
  }

}

module.exports = Filter
