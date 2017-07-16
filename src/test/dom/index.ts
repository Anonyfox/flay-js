import { expect } from 'chai'
import { readFileSync } from 'fs'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import { join } from 'path'
import { Website } from '../../lib/dom'

const defaultInput = readFileSync('data/venturebeat.html', 'utf-8')

@suite(timeout(1000), slow(100))
class DomTest {
  @test
  public async worksWithSimpleHTML() {
    const result = new Website(defaultInput).toJSON()
    // tslint:disable-next-line
    // console.log(result)
    const title =
      'How Google, Amazon, and Facebook would look if they had started in the age of AI'
    expect(result.title).to.be.equal(title)

    const description =
      'In the past few years, artificial intelligence has come into its own, and lots of companies are grafting it onto their core businesses, marrying AI with search, ecommerce, social networking, cybersecurity -- you name it. But what if those businesses had started out in an age of AI and had integrated it into their products from the very beginning?'
    expect(result.description).to.be.equal(description)

    const feedUrl = 'http://feeds.feedburner.com/venturebeat/SZYF'
    expect(result.feedUrl).to.be.equal(feedUrl)

    const image =
      'https://venturebeat.com/wp-content/uploads/2017/07/peter-relan.jpg?fit=780%2C500&strip=all'
    expect(result.image).to.be.equal(image)

    const keywords = ['facebook', 'amazon', 'google', 'knowledge network', 'ai']
    expect(result.keywords).to.include.members(keywords)
  }
}
