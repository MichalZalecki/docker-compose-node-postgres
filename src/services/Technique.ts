import { DBInterface } from '../typings/DbInterface'
import { TechniqueAttributes } from '../models/Technique'
import ErrorGenerator from '../error'

export interface TechniqueFindParams extends Partial<Omit<TechniqueAttributes, 'videoLink'>> {}

export default class Technique {
  private db: DBInterface

  constructor(db: DBInterface) {
    this.db = db
  }

  async find(params?: TechniqueFindParams): Promise<TechniqueFindParams[]> {
    try {
      const techniquesFound = await this.db.Technique.findAll({ where: params })
      return techniquesFound.map((el) => el.get({ plain: true }))
    } catch (e) {
      throw new ErrorGenerator('Server.internal', e).type
    }
  }

  async create(techniques: TechniqueAttributes[]): Promise<TechniqueAttributes[]> {
    if (!techniques || !techniques.length) {
      throw new ErrorGenerator('Server.internal').type
    }

    try {
      const newTechnique = await this.db.Technique.bulkCreate(techniques)
      return newTechnique.map((el) => el.get({ plain: true }))
    } catch (e) {
      throw new ErrorGenerator('Server.internal', e).type
    }
  }
}
