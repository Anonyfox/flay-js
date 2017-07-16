import { expect } from 'chai'
import * as cheerio from 'cheerio'
import { readFileSync } from 'fs'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import { join } from 'path'
import { Twitter } from '../../../lib/dom/head/twitter'

@suite(timeout(100), slow(10))
class DomHeadTwitterTest {
  @test
  public worksWithDefaultHTML() {
    const input = `<html>
      <head>
        <meta name="twitter:title" content="Twitter Title">
        <meta name="twitter:description" content="Twitter Description">
        <meta name="twitter:image" content="Twitter Image">
        <meta name="twitter:creator" content="Twitter Author">
      </head>
      <body></body>
    </html>`
    const twitter = new Twitter(cheerio.load(input)).toJSON()
    expect(twitter.title).to.be.equal('Twitter Title')
    expect(twitter.description).to.be.equal('Twitter Description')
    expect(twitter.image).to.be.equal('Twitter Image')
    expect(twitter.author).to.be.equal('Twitter Author')
  }
}
