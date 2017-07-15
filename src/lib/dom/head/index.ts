import { merge } from 'lodash'
import { IOpengraphData, Opengraph } from './opengraph'
import { ITwitterData, Twitter } from './twitter'

export interface IHeadData extends IOpengraphData, ITwitterData {}

export class Head {
  private data: IHeadData = {}

  constructor(private $: CheerioStatic) {
    const og = new Opengraph($)
    const tw = new Twitter($)
    this.data = merge({}, tw.toJSON(), og.toJSON())
  }

  public toJSON(): IHeadData {
    return this.data
  }
}
