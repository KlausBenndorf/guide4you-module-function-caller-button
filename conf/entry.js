import ol from 'openlayers'
import {createMapInternal} from 'guide4you/src/main'

import { registerModule } from 'guide4you/src/moduleRegistration'
import { ConfirmModule } from '../src/ConfirmModule'
import { DiscardModule } from '../src/DiscardModule'
import defaultClientConf from 'file-loader?name=conf/[name].[ext]!mustache-loader!./client.commented.json'
import defaultLayerConf from 'file-loader?name=conf/[name].[ext]!mustache-loader!./layers.commented.json'

import 'tojson-file-loader?name=files/[name]!../files/l10n.json.js'
import 'tojson-file-loader?name=files/[name]!../files/helptext.json.js'

import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/arrowbuttons.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/attribution-collapsed.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/attribution-expanded-de.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/attribution-expanded-en.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/button-area.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/button-documentation.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/button-geolocation-active.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/button-geolocation-inactive.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/button-home.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/button-info.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/button-lang-de.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/button-lang-en.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/button-line.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/button-print.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/layerselector-de.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/layerselector-en.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/layermenu-mobile.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/overviewmap.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/overviewmap-collapsed.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/scaleline.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/zoom.png'

import 'file-loader?name=proxy/[name].[ext]!mustache-loader!guide4you-proxy/proxy.php'
import 'file-loader?name=proxy/AjaxProxy.[ext]!guide4you-proxy/LICENSE.txt'

// If g4uConfirm/g4uDiscard needs to access the map you cannot provide them via the constructor.
// You then drop the controlFunction setting and set the function by setFunction.
// The right place to do this is inside createMapInternal.
registerModule(new ConfirmModule())
registerModule(new DiscardModule())

export function createMap (target, clientConf = defaultClientConf, layerConf = defaultLayerConf) {
  return createMapInternal(target, clientConf, layerConf).then(map => {
    // A function that sets all confirm/discard buttons (both mobile and desktop) active/inactive
    // For demo purposes only
    let setButtonsActive = (active) => {
      let controls = {
        'confirmButton': () => window.alert('CONFIRM'),
        'discardButton': () => window.alert('DISCARD')
      }
      for (let control in controls) {
        for (let button of map.getControlsByName(control)) {
          button.setActive(active)
          if (!button.hasFunction()) {
            button.setFunction(controls[control])
          }
        }
      }
    }

    // initially: buttons inactive
    let active = false

    let switchButtonState = () => {
      active = !active
      setButtonsActive(active)
    }

    // switch button activity every 5 seconds
    // for demo purposes only
    setInterval(switchButtonState, 5000)
  })
}
