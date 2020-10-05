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
      throw new Error(e)
    }
  }

  async createIfNotExists(user: UserAttributes): Promise<UserAttributes> {
    console.log(user)
    if (!user) {
      throw new Error('User doesn\'t exist')
    }

    try {
      const existingUser = await this.db.User.findOne({where: {id: user.id}})
      if(existingUser){
        return existingUser
      }

      const newUser = await this.db.User.create(user)
      return newUser.get({plain: true})
    } catch (e) {
      throw new Error(e)
    }
  }
}
