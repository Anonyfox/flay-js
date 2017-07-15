import * as condense from 'condense-whitespace'
import { AllHtmlEntities } from 'html-entities'
import { filter } from 'lodash'
import rake from 'rake-js'
import * as Readability from 'readabilitySAX'
import * as striptags from 'striptags'
import * as JsTeaser from 'teaser'
import * as unescape from 'unescape'

export interface IBodyData {
  html?: string
  title?: string
  text?: string
  summary?: string
  keywords?: string[]
}

export class Body {
  private data: IBodyData = {}

  constructor(private originalHtml: string) {
    this.calculateDefaultPage()
    this.calculatePlainText()
    this.calculateSummary()
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
    const text = AllHtmlEntities.decode(unescape(striptags(this.data.html)))
    this.data.text = condense(text)
  }

  private calculateSummary() {
    const sentences: string[] = new JsTeaser({
      text: this.data.text,
      title: this.data.title,
    }).summarize()
    const relevantSentences = filter(sentences, (s: string) => s.length > 20)
    this.data.summary = relevantSentences.join('\n')
  }

  private calculateKeywords() {
    const { title, summary, text } = this.data
    const corpus = `${title}. ${summary} ${text}`
    this.data.keywords = rake(corpus)
  }
}
