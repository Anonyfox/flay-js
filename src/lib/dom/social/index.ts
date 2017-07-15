import { merge } from 'lodash'
import { IOpengraphData, Opengraph } from './opengraph'
import { ITwitterData, Twitter } from './twitter'

export interface ISocialData extends IOpengraphData, ITwitterData {}

export class Social {
  private data: ISocialData = {}

  constructor(private $: CheerioStatic) {
    const og = new Opengraph($)
    const tw = new Twitter($)
    this.data = merge({}, tw.toJSON(), og.toJSON())
  }

  public toJSON(): ISocialData {
    return this.data
  }
}
