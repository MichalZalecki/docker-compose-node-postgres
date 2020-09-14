import { DBInterface } from '../typings/DbInterface'
import { UserAttributes } from '../models/User'
import ErrorGenerator from '../error'

export interface UserFindParams {
  id: string
}

export default class User {
  private db: DBInterface

  constructor(db: DBInterface) {
    this.db = db
  }

  async find(params: UserFindParams): Promise<UserFindParams> {
    try {
      const UsersFound = await this.db.User.findOne({ where: {id: params.id}})

      if(!UsersFound){
        throw new ErrorGenerator('Authentication.rejected').type
      }

      return UsersFound.get({plain: true})
    } catch (e) {
      throw new ErrorGenerator('Server.internal', e).type
    }
  }

  async createIfNotExists(user: UserAttributes): Promise<UserAttributes> {
    if (!user) {
      throw new ErrorGenerator('Server.internal').type
    }

    try {
      const existingUser = await this.db.User.findOne({where: {id: user.id}})
      if(existingUser){
        return existingUser
      }

      const newUser = await this.db.User.create(user)
      return newUser.get({plain: true})
    } catch (e) {
      console.log(e)
      throw new ErrorGenerator('Server.internal', e).type
    }
  }
}
