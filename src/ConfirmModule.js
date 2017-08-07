import { ConfirmButton } from './ConfirmButton'
import { Module } from 'guide4you/src/Module'

export class ConfirmModule extends Module {
  /**
   * This method is called if the ControlFactory can't construct controls of this type
   * @param {string} controlType
   * @param {g4uControlOptions} options
   * @param {ComposedControl|G4UMap} receiver
   * @returns {undefined|ConfirmButton}
   */
  createControl (controlType, options, receiver) {
    if (controlType === 'confirmButton') {
      return new ConfirmButton(options)
    }
  }
}
