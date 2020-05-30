import { DBInterface } from '../typings/DbInterface'
import { TechniqueAttributes } from '../models/Technique'
import ErrorGenerator from '../error'

export interface techniqueFindParams extends Partial<Omit<TechniqueAttributes, 'videoLink'>> {}

export default class Technique {
  private db: DBInterface

  constructor(db: DBInterface) {
    this.db = db
  }

  async find(params?: techniqueFindParams): Promise<techniqueFindParams[]> {
    try {
      const techniquesFound = await this.db.Technique.findAll({ where: params })
      return techniquesFound.map((el) => el.get({ plain: true }))
    } catch (e) {
      throw new ErrorGenerator('Server.internal', e)
    }
  }

  async create(techniques: TechniqueAttributes[]): Promise<TechniqueAttributes[]> {
    if (!techniques || !techniques.length) {
      throw new ErrorGenerator('Server.internal')
    }

    try {
      const newTechnique = await this.db.Technique.bulkCreate(techniques)
      return newTechnique.map((el) => el.get({ plain: true }))
    } catch (e) {
      throw new ErrorGenerator('Server.internal', e)
    }
  }
}
