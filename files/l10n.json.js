// As the webpack loader's exec method is broken we need to do plain ES5 here

var merge = require('lodash/merge')

module.exports = merge(require('guide4you/files/l10n.json.js'), {
  'ConfirmButton tipLabel': {
    'de': 'Übernehmen',
    'en': 'Confirm'
  },
  'ConfirmButton title': {
    'de': 'Bestätigen',
    'en': 'Confirm'
  },
  'DiscardButton tipLabel': {
    'de': 'Verwerfen',
    'en': 'Discard'
  },
  'DiscardButton title': {
    'de': 'Verwerfen',
    'en': 'Discard'
  }
})
