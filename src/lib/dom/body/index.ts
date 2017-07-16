import * as condense from 'condense-whitespace'
import { AllHtmlEntities } from 'html-entities'
import { filter } from 'lodash'
import rake from 'rake-js'
import * as Readability from 'readabilitySAX'
import * as striptags from 'striptags'
import * as JsTeaser from 'teaser'
import * as unescape from 'unescape'
import { sanitize } from '../../text'

export interface IBodyData {
  html?: string
  title?: string
  text?: string
  description?: string
  keywords?: string[]
}

export class Body {
  private data: IBodyData = {}

  constructor(private originalHtml: string) {
    this.calculateDefaultPage()
    this.calculatePlainText()
    this.calculateSummary() // TODO: this is quite slow
    this.calculateKeywords()
  }

  public toJSON(): IBodyData {
    return this.data
  }

  private calculateDefaultPage() {
    const page = Readability.process(this.originalHtml)
    this.data.title = page.title
    this.data.html = page.html || this.originalHtml
  }

  private calculatePlainText() {
    this.data.text = sanitize(this.data.html)
  }

  private calculateSummary() {
    const sentences: string[] = new JsTeaser({
      text: this.data.text,
      title: this.data.title,
    }).summarize()
    const relevantSentences = filter(sentences, s => s.length > 20)
    this.data.description = relevantSentences.join('\n')
  }

  private calculateKeywords() {
    const { title, description, text } = this.data
    const corpus = `${title}. ${description} ${text}`
    this.data.keywords = rake(corpus)
  }
}
