import rake from 'rake-js'

export async function website(html: string): Promise<any> {
  const keywords = rake('this is a hello world sample text. hello.')
  // tslint:disable-next-line
  // console.log('keywords: ', keywords)
  return 'test'
}
