import { merge } from 'lodash'
import { IMetaData, Meta } from './meta'
import { IOpengraphData, Opengraph } from './opengraph'
import { ITwitterData, Twitter } from './twitter'

export interface IHeadData extends IOpengraphData, ITwitterData, IMetaData {}

export class Head {
  private data: IHeadData = {}

  constructor(private $: CheerioStatic) {
    const meta = new Meta($)
    const tw = new Twitter($)
    const og = new Opengraph($)
    this.data = merge({}, meta.toJSON(), tw.toJSON(), og.toJSON())
  }

  public toJSON(): IHeadData {
    return this.data
  }
}
