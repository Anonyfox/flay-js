import { expect } from 'chai'
import * as cheerio from 'cheerio'
import { readFileSync } from 'fs'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import { join } from 'path'
import { Head } from '../../../lib/dom/head'

@suite(timeout(1000), slow(100))
class HeadTest {
  @test
  public worksWithDefaultHTML() {
    const input = `<html>
      <head>
        <meta property="og:title" content="OGP Title">
        <meta property="og:description" content="OGP Description">
        <meta property="og:image" content="OGP Image">
        <meta property="og:site_name" content="OGP Site">
        <meta name="twitter:title" content="Twitter Title">
        <meta name="twitter:description" content="Twitter Description">
        <meta name="twitter:image" content="Twitter Image">
        <meta name="twitter:creator" content="Twitter Author">
      </head>
      <body></body>
    </html>`
    const head = new Head(cheerio.load(input)).toJSON()
    expect(head.title).to.be.equal('OGP Title')
    expect(head.description).to.be.equal('OGP Description')
    expect(head.image).to.be.equal('OGP Image')
    expect(head.site).to.be.equal('OGP Site')
    expect(head.author).to.be.equal('Twitter Author')
  }
}
