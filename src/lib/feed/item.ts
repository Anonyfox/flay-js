import * as cheerio from 'cheerio'
import { union } from 'lodash'
import rake from 'rake-js'
import { sanitize } from '../text'

export interface IFeedItem {
  title?: string
  description?: string
  url?: string
  pubDate?: string
  imageUrl?: string
  keywords?: string[]
}

export function parseItem(node: CheerioElement): IFeedItem {
  const $ = cheerio.load(node, { xmlMode: true })
  const result: IFeedItem = {}
  result.title = sanitize($('title').first().text()) || ''
  result.description = sanitize($('summary,description').first().text()) || ''
  result.url = findUrl($)
  result.pubDate = $('updated,pubDate,pubdate').first().text()
  result.imageUrl = findImage($)
  result.keywords = findKeywords($, `${result.title}. ${result.description}`)
  return result
}

function findUrl($: CheerioStatic): string {
  return $('link').first().attr('href') || $('link').first().text() || ''
}

function findImage($: CheerioStatic): string {
  const image =
    $('enclosure').attr('url') ||
    $('media\\:content, media\\:thumbnail, content').attr('url')
  if (image) {
    return image
  } else {
    const str = $('media\\:content, content\\:encoded, content').html()
    if (str) {
      return str.match(/\ssrc=["']*(([^'"\s]+)\.(jpe?g)|(png))["'\s]/)[1]
    } else {
      return ''
    }
  }
}

function findKeywords($: CheerioStatic, content: string): string[] {
  const foreignTags = $('category,categories').map((_, e) => $(e).text()).get()
  const keywords = rake(content)
  return union(foreignTags, keywords)
}
