import { expect } from 'chai'
import { readFileSync } from 'fs'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import { join } from 'path'
import { feed, website } from '../lib/index'

@suite(timeout(1000), slow(100))
class Scrape {
  @test
  public scrapeWorksWithSimpleHTML() {
    const input = `<html><head><title>TestHTML</title></head></html>`
    const result = website(input)
    // tslint:disable-next-line
    // console.log(result)
    expect(result.title).to.be.equal('TestHTML')
  }

  @test
  public scrapeWorksWithSimpleFeed() {
    const input = `<?xml version="1.0" encoding="UTF-8" ?>
      <rss version="2.0">
        <channel>
          <title>RSS Title</title>
        </channel>
      </rss>`
    const result = feed(input)
    // tslint:disable-next-line
    // console.log(result)
    expect(result.title).to.be.equal('RSS Title')
  }
}
