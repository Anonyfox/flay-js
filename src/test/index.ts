import { expect } from 'chai'
import { readFileSync } from 'fs'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import { join } from 'path'
import { website } from '../lib/index'

@suite(timeout(1000), slow(100))
class Scrape {
  @test
  public async worksWithSimpleHTML() {
    const input = `<html><head><title>TestHTML</title></head></html>`
    const expected = 'test'

    const result = await website(input)
    // tslint:disable-next-line
    // console.log(result)
    expect(result).to.be.equal(expected)
  }
}
