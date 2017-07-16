import * as cheerio from 'cheerio'
import { map, trim } from 'lodash'
import { sanitize } from '../../text'

export interface IMetaData {
  title?: string
  description?: string
  author?: string
  feedUrl?: string
  faviconUrl?: string
  keywords?: string[]
}

export class Meta {
  private data: IMetaData = {}

  constructor(private $: CheerioStatic) {
    this.data.title = sanitize(this.$('title').first().text())
    this.data.description = sanitize(this.find("meta[name='description']"))
    this.data.author = this.find("meta[name='author']")
    this.findFaviconUrl()
    this.findFeedUrl()
    this.findKeywords()
  }

  public toJSON(): IMetaData {
    return this.data
  }

  private findFeedUrl() {
    this.data.feedUrl =
      this.$("link[type='application/rss+xml']").attr('href') ||
      this.$("link[type='application/atom+xml']").attr('href') ||
      this.$("link[rel='alternate']").attr('href')
  }

  private findFaviconUrl() {
    this.data.faviconUrl =
      this.$("link[rel='apple-touch-icon']").attr('href') ||
      this.$("link[rel='shortcut icon']").attr('href') ||
      this.$("link[rel='icon']").attr('href')
  }

  private findKeywords() {
    const str = this.find("meta[name='keywords']")
    if (!str) {
      return
    }
    this.data.keywords = map(str.split(/[,;]/), w => sanitize(w))
  }

  private find(selector: string): string {
    return this.$(selector).first().attr('content')
  }
}
