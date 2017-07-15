"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mocha_typescript_1 = require("mocha-typescript");
const index_1 = require("../lib/index");
let Scrape = class Scrape {
    worksWithSimpleHTML() {
        return __awaiter(this, void 0, void 0, function* () {
            const input = `<html><head><title>TestHTML</title></head></html>`;
            const expected = 'test';
            const result = yield index_1.website(input);
            chai_1.expect(result).to.be.equal(expected);
        });
    }
};
__decorate([
    mocha_typescript_1.test
], Scrape.prototype, "worksWithSimpleHTML", null);
Scrape = __decorate([
    mocha_typescript_1.suite(mocha_typescript_1.timeout(1000), mocha_typescript_1.slow(100))
], Scrape);
//# sourceMappingURL=index.js.map