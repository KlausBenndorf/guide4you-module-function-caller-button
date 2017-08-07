import $ from 'jquery'

import {Control} from 'guide4you/src/controls/Control'
import {addTooltip} from 'guide4you/src/html/html'
import {cssClasses} from 'guide4you/src/globals'

/**
 * @typedef {g4uControlOptions} FunctionCallerButtonOptions
 * @property {string} [controlType='FunctionCallerButton'] Control type - used to obtain localised title/tipLabel
 * @property {function} [controlFunction_=()=>{}] Function to be executed by button
 *
 */

/**
 * A generic button
 * position of the map. It provides an Interface class with an produceOlControl returning an
 * {ol.control.Control} - Object. This can be added as normal controls to the map
 * (e.g. ``map.addControl(arrowButtons.produceOlControl)`` ).
 *
 * The Options are passed as an Object (e.g. ``{ initCenter : map.getView().getCenter(),
 *      initZoom : map.getView().getZoom() }``.
 */

export class FunctionCallerButton extends Control {
  constructor (options = {}) {
    options.className = options.className || 'g4u-functioncallerbutton'
    options.controlType = options.controlType || 'FunctionCallerButton'
    options.singleButton = true
    options.element = $('<button>').get(0)

    super(options)
    if (this.constructor === FunctionCallerButton) {
      throw new Error('Cannot instantiate this class')
    }

    this.controlFunction_ = null
    this.classNameDisabled_ = this.className_ + '-disabled'

    this.setTitle(
      this.getTitle() || this.getLocaliser().localiseUsingDictionary(`${options.controlType} title`)
    )

    this.setTipLabel(
      this.getTipLabel() || this.getLocaliser().localiseUsingDictionary(`${options.controlType} tipLabel`)
    )

    this.get$Element()
      .addClass(this.className_)
      .addClass(this.classNameDisabled_)
      .addClass(cssClasses.mainButton)
      .html(this.getTitle())

    addTooltip(this.get$Element(), this.getTipLabel())

    /**
     * @type {boolean}
     * @private
     */
    this.active_ = false

    /**
     * @type {boolean}
     * @private
     */
    this.hasClickHandler_ = false
  }

  /**
   * @returns {boolean}
   */
  getActive () {
    return this.active_
  }

  /**
   * Activate/deactivate Button
   * @param {boolean} active
   */
  setActive (active) {
    this.active_ = active
    if (active) {
      this.get$Element().removeClass(this.classNameDisabled_)
      if (!this.hasClickHandler_) {
        this.get$Element().on('click touch', (e) => {
          if (this.active_) {
            if (this.controlFunction_) {
              this.controlFunction_()
            }
          }
        })
        this.hasClickHandler_ = true
      }
    } else {
      this.get$Element().addClass(this.classNameDisabled_)
    }
  }

  /**
   * @param {function} fn Function to be executed by button
   */
  setFunction (fn) {
    this.controlFunction_ = fn
  }

  /**
   * @returns boolean
   */
  hasFunction (fn) {
    return !!this.controlFunction_
  }

  /**
   * @param {function} fn unset function
   */
  unsetFunction (fn) {
    this.controlFunction = null
  }
}
