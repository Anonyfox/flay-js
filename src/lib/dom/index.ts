import * as cheerio from 'cheerio'

export class Website {
  private $: CheerioStatic // cheerio DOM instance

  constructor(private html: string) {
    this.$ = cheerio.load(html)
  }
}
