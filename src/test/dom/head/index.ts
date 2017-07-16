import { expect } from 'chai'
import * as cheerio from 'cheerio'
import { readFileSync } from 'fs'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import { join } from 'path'
import { Head } from '../../../lib/dom/head'

// DOM parsing itself should not be within tight test timings
const defaultInput = cheerio.load(`<html>
      <head>
        <title>Meta Title</title>

        <meta name="description" content="Meta Description">
        <meta name="author" content="Meta Author">
        <meta name="keywords" content="Hello, World">

        <link type="application/atom+xml" href="http://examplefeed.com">
        <link rel="shortcut icon" href="favicon.ico">

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
    </html>`)

@suite(timeout(100), slow(10))
class DomHeadTest {
  @test
  public worksWithDefaultHTML() {
    const head = new Head(defaultInput).toJSON()
    expect(head.title).to.be.equal('OGP Title')
    expect(head.description).to.be.equal('OGP Description')
    expect(head.image).to.be.equal('OGP Image')
    expect(head.site).to.be.equal('OGP Site')
    expect(head.author).to.be.equal('Twitter Author')
  }
}
