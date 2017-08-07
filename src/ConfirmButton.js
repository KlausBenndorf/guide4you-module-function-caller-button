import {FunctionCallerButton} from './FunctionCallerButton'

import '../less/confirmButton.less'

export class ConfirmButton extends FunctionCallerButton {
  constructor (options = {}) {
    options.className = options.className || 'g4u-confirmbutton'
    options.controlType = options.controlType || 'ConfirmButton'
    super(options)
  }
}
