import { expect } from 'chai'
import * as cheerio from 'cheerio'
import { readFileSync } from 'fs'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import { join } from 'path'
import { Body } from '../../../lib/dom/body'

const defaultInput = readFileSync('data/venturebeat.html', 'utf-8')

@suite(timeout(1000), slow(200))
class DomBodyTest {
  @test
  public worksWithEasyHTML() {
    const body = new Body(defaultInput).toJSON()
    const title =
      'How Google, Amazon, and Facebook would look if they had started in the age of AI'
    expect(body.title).to.be.equal(title)

    const keywords = ['facebook', 'amazon', 'google', 'knowledge network', 'ai']
    expect(body.keywords).to.include.members(keywords)

    expect(body.html).be.a('string')
    expect(body.text).be.a('string')
    expect(body.description).be.a('string')
  }
}
