import { VarComponent, BasicAttributes, SetPropsDefaults } from '../../types/varComponent'

export declare const buttomProps: Record<keyof ButtomProps, any>

export interface ButtomProps extends BasicAttributes {}

export class Buttom extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<ButtomProps>
  
  $props: ButtomProps
}

export class _ButtomComponent extends Buttom {}