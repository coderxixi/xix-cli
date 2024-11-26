import Buttom from './Buttom.vue'
import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as buttomProps } from './props'

withInstall(Buttom)
withPropsDefaultsSetter(Buttom, buttomProps)

export { buttomProps  }

export const _ButtomComponent = Buttom

export default Buttom
