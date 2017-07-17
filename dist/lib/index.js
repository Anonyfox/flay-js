"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var feed_1 = require("./feed");
exports.feed = feed_1.parseFeed;
const dom_1 = require("./dom");
function website(html) {
    return new dom_1.Website(html).toJSON();
}
exports.website = website;
//# sourceMappingURL=index.js.map