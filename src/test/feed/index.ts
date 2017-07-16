import { expect } from 'chai'
import { readFileSync } from 'fs'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import { join } from 'path'
import { parseFeed } from '../../lib/feed'

const defaultInput = readFileSync('data/tc_feed.xml', 'utf-8')

@suite(timeout(1000), slow(100))
class Feedest {
  @test
  public async worksWithSimpleXML() {
    const result = parseFeed(defaultInput)
    // tslint:disable-next-line
    // console.log(result)
    expect(result.title).to.be.equal('TechCrunch')
    expect(result.description).to.be.equal('Startup and Technology News')
    expect(result.items.length).to.be.above(0)
  }
}
