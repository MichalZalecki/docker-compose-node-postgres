import server from '../server'

const globalJest:any = global;

export default async() => {
  globalJest.server = await server.start()
}