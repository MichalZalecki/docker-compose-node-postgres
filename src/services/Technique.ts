import { DBInterface } from '../typings/DbInterface'
import { TechniqueInstance, TechniqueAttributes } from '../models/Technique'
import ErrorGenerator from '../error'

interface techniqueFindParams extends Partial<Omit<TechniqueAttributes, 'videoLink'>> {}

export default class Technique {
  private db: DBInterface

  constructor(db: DBInterface) {
    this.db = db
  }

  async find(params?: techniqueFindParams): Promise<TechniqueInstance[]> {
    try {
      const techniquesFound = await this.db.Technique.findAll({ where: params })
      return techniquesFound
    } catch (e) {
      throw new ErrorGenerator('Server.internal', e)
    }
  }

  async create(techniques: TechniqueAttributes[]): Promise<TechniqueInstance[]> {
    if (!techniques || !techniques.length) {
      throw new ErrorGenerator('Server.internal')
    }

    try {
      const newTechnique = this.db.Technique.bulkCreate(techniques)
      return newTechnique
    } catch (e) {
      throw new ErrorGenerator('Server.internal', e)
    }
  }
}
