import * as cheerio from 'cheerio'
import { merge, union } from 'lodash'
import { Body, IBodyData } from './body'
import { Head, IHeadData } from './head'

export interface IWebsiteData extends IHeadData, IBodyData {}

export class Website {
  private data: IWebsiteData = {}
  private head: IHeadData = {}
  private body: IBodyData = {}

  constructor(private html: string) {
    this.head = new Head(cheerio.load(html)).toJSON()
    this.body = new Body(html).toJSON()
    this.mergeData()
  }

  public toJSON(): IHeadData {
    return this.data
  }

  private mergeData() {
    // handle important overlapping data fields
    const keywords = union(this.head.keywords, this.body.keywords)
    const description = this.head.description || this.body.description
    const title = this.body.title || this.head.title
    const overrides = { keywords, description, title }

    // combine all sources
    this.data = merge({}, this.head, this.body, overrides)
  }
}
