import {FunctionCallerButton} from './FunctionCallerButton'

import '../less/discardButton.less'

export class DiscardButton extends FunctionCallerButton {
  constructor (options = {}) {
    options.className = options.className || 'g4u-discardbutton'
    options.controlType = options.controlType || 'DiscardButton'
    super(options)
  }
}
