import { expect } from 'chai'
import * as cheerio from 'cheerio'
import { readFileSync } from 'fs'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import { join } from 'path'
import { Social } from '../../../lib/dom/social'

@suite(timeout(1000), slow(100))
class OpengraphTest {
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
    const social = new Social(cheerio.load(input)).toJSON()
    expect(social.title).to.be.equal('OGP Title')
    expect(social.description).to.be.equal('OGP Description')
    expect(social.image).to.be.equal('OGP Image')
    expect(social.site).to.be.equal('OGP Site')
    expect(social.author).to.be.equal('Twitter Author')
  }
}
