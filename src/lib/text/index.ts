import * as condense from 'condense-whitespace'
import { AllHtmlEntities } from 'html-entities'
import { chain } from 'lodash'
import * as striptags from 'striptags'
import * as unescape from 'unescape'

// transform a given string full of HTML stuff and get clean content back
export function sanitize(s: string): string {
  return condense(AllHtmlEntities.decode(unescape(striptags(s))))
}
