const globalJest:any = global;

export default async() => {
  await globalJest.server.close()
}