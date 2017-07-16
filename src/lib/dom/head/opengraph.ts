import * as cheerio from 'cheerio'
import { sanitize } from '../../text'

export interface IOpengraphData {
  title?: string
  description?: string
  image?: string
  site?: string
}

export class Opengraph {
  private data: IOpengraphData = {}

  constructor(private $: CheerioStatic) {
    this.data.title = sanitize(this.find("meta[property='og:title']"))
    this.data.description = sanitize(
      this.find("meta[property='og:description']")
    )
    this.data.image = this.find("meta[property='og:image']")
    this.data.site = this.find("meta[property='og:site_name']")
  }

  public toJSON(): IOpengraphData {
    return this.data
  }

  private find(selector: string): string {
    return this.$(selector).first().attr('content')
  }
}
