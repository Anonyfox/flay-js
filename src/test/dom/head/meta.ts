import { expect } from 'chai'
import * as cheerio from 'cheerio'
import { readFileSync } from 'fs'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import { join } from 'path'
import { Meta } from '../../../lib/dom/head/meta'

@suite(timeout(100), slow(10))
class DomHeadMetaTest {
  @test
  public worksWithDefaultHTML() {
    const input = `<html>
      <head>
        <title>Meta Title</title>
        <meta name="description" content="Meta Description">
        <meta name="author" content="Meta Author">
        <meta name="keywords" content="Hello, World">
        <link type="application/atom+xml" href="http://examplefeed.com">
        <link rel="shortcut icon" href="favicon.ico">
      </head>
      <body></body>
    </html>`
    const meta = new Meta(cheerio.load(input)).toJSON()
    expect(meta.title).to.be.equal('Meta Title')
    expect(meta.description).to.be.equal('Meta Description')
    expect(meta.author).to.be.equal('Meta Author')
    expect(meta.feedUrl).to.be.equal('http://examplefeed.com')
    expect(meta.faviconUrl).to.be.equal('favicon.ico')
    expect(meta.keywords).to.have.members(['Hello', 'World'])
  }
}
