import path from 'path'
import fs from 'fs'
export const createIndexSchema = (dir: string) => {
  const files = fs.readdirSync(dir)
  const contents = files.map((file) => fs.readFileSync(path.join(dir, file), 'utf8'))
  return fs.writeFileSync(path.join(dir, 'index.graphql'), contents.join('\n'))
}
