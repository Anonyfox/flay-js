"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mocha_typescript_1 = require("mocha-typescript");
const index_1 = require("../lib/index");
let Scrape = class Scrape {
    scrapeWorksWithSimpleHTML() {
        const input = `<html><head><title>TestHTML</title></head></html>`;
        const result = index_1.website(input);
        chai_1.expect(result.title).to.be.equal('TestHTML');
    }
    scrapeWorksWithSimpleFeed() {
        const input = `<?xml version="1.0" encoding="UTF-8" ?>
      <rss version="2.0">
        <channel>
          <title>RSS Title</title>
        </channel>
      </rss>`;
        const result = index_1.feed(input);
        chai_1.expect(result.title).to.be.equal('RSS Title');
    }
};
__decorate([
    mocha_typescript_1.test
], Scrape.prototype, "scrapeWorksWithSimpleHTML", null);
__decorate([
    mocha_typescript_1.test
], Scrape.prototype, "scrapeWorksWithSimpleFeed", null);
Scrape = __decorate([
    mocha_typescript_1.suite(mocha_typescript_1.timeout(1000), mocha_typescript_1.slow(100))
], Scrape);
//# sourceMappingURL=index.js.map