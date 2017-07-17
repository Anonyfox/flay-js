# scrape.js

A pure JS implementation of the Rapid Automated Keyword Extraction (RAKE) algorithm. Put in any text corpus, get back a bunch of keyphrases and keywords.

[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)
[![Build Status](https://travis-ci.org/Anonyfox/scrape-js.svg?branch=master)](https://travis-ci.org/Anonyfox/scrape-js)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](http://www.gnu.org/licenses/lgpl-3.0)

## How to use

````javascript
  import { feed, website } from 'scrape-js'

  const websiteData = website(someHtmlString)
  // or
  const feedData = feed(someXmlString)
````

## Implementation Details

This algorithm can parse both, websites and RSS/Atom feeds, and return
structured data as good as possible.

## LICENSE:

LGPL-3.0.

You can use this package in all your free or commercial products without any issues, but I want bugfixes and improvements to this algorithm to flow back into the public code repository.