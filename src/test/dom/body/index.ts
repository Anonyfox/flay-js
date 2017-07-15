import { expect } from 'chai'
import * as cheerio from 'cheerio'
import { readFileSync } from 'fs'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import { join } from 'path'
import { Body } from '../../../lib/dom/body'

@suite(timeout(1000), slow(200))
class BodyTest {
  @test
  public worksWithEasyHTML() {
    const input = readFileSync('data/venturebeat.html', 'utf-8')
    const body = new Body(input).toJSON()
    const title =
      'How Google, Amazon, and Facebook would look if they had started in the age of AI'
    const keywords = ['facebook', 'amazon', 'google', 'knowledge network', 'ai']
    expect(body.title).to.be.equal(title)
    expect(body.html).be.a('string')
    expect(body.text).be.a('string')
    expect(body.summary).be.a('string')
    expect(body.keywords).to.include.members(keywords)
  }
}
