import * as cheerio from 'cheerio'
import { sanitize } from '../../text'

export interface ITwitterData {
  title?: string
  description?: string
  image?: string
  author?: string
}

export class Twitter {
  private data: ITwitterData = {}

  constructor(private $: CheerioStatic) {
    this.data.title = sanitize(this.find("meta[name='twitter:title']"))
    this.data.description = sanitize(
      this.find("meta[name='twitter:description']")
    )
    this.data.image = this.find("meta[name='twitter:image']")
    this.data.author = this.find("meta[name='twitter:creator']")
  }

  public toJSON(): ITwitterData {
    return this.data
  }

  private find(selector: string): string {
    return this.$(selector).first().attr('content')
  }
}
