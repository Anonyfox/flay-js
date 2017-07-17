export { parseFeed as feed } from './feed'
import { IWebsiteData, Website } from './dom'

export function website(html: string): IWebsiteData {
  return new Website(html).toJSON()
}
