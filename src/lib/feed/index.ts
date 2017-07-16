import * as cheerio from 'cheerio'
// import { merge, union } from 'lodash'
import { IFeedItem, parseItem } from './item'

export interface IMainImage {
  title?: string
  url?: string
  link?: string
  width?: number
  height?: number
}

export interface IFeedData {
  title?: string
  link?: string
  description?: string
  language?: string
  pubDate?: string
  lastBuildDate?: string
  docs?: string
  managingEditor?: string
  webMaster?: string
  image?: IMainImage
  items?: IFeedItem[]
}

export function parseFeed(xml: string): IFeedData {
  const result: IFeedData = {}
  const $ = cheerio.load(xml, { xmlMode: true })
  const fields = [
    'title',
    'link',
    'description',
    'language',
    'pubDate',
    'lastBuildDate',
    'docs',
    'managingEditor',
    'webMaster',
  ]
  for (const field of fields) {
    result[field] = $(field).first().text() || ''
  }
  result.image = findMainImage($)
  result.items = findItems($)
  return result
}

function findMainImage($: CheerioStatic): IMainImage {
  return {
    height: parseInt($('image height').first().text(), 10) || 0,
    link: $('image link').first().text() || '',
    title: $('image title').first().text() || '',
    url: $('image url').first().text() || '',
    width: parseInt($('image width').first().text(), 10) || 0,
  }
}

function findItems($: CheerioStatic): IFeedItem[] {
  const list: IFeedItem[] = []
  $('item,entry').each((_, element) => list.push(parseItem(element)))
  return list
}
