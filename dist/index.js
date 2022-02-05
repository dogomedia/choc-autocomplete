
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./chakra-autocomplete.cjs.production.min.js')
} else {
  module.exports = require('./chakra-autocomplete.cjs.development.js')
}
