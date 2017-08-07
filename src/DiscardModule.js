import { DiscardButton } from './DiscardButton'
import { Module } from 'guide4you/src/Module'

export class DiscardModule extends Module {
  /**
   * This method is called if the ControlFactory can't construct controls of this type
   * @param {string} controlType
   * @param {g4uControlOptions} options
   * @param {ComposedControl|G4UMap} receiver
   * @returns {undefined|DiscardButton}
   */
  createControl (controlType, options, receiver) {
    if (controlType === 'discardButton') {
      return new DiscardButton(options)
    }
  }
}
