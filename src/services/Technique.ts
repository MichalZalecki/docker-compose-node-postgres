import { DBInterface } from '../typings/DbInterface'
import { TechniqueInstance } from '../models/Technique'
import ErrorGenerator from '../error'

export interface TechniqueCreateInterface {
  id?: string
  name: string
  title: string
  description: string
  duration: number
  standardTemperature: number
  videoLink: string
}

interface techniqueFindInterface {
  id?: string
  name?: string
  title?: string
  description?: string
  duration?: number
  standardTemperature?: number
}

export default class Technique {
  private db: DBInterface

  constructor(db: DBInterface) {
    this.db = db
  }

  async find(params?: techniqueFindInterface): Promise<TechniqueInstance[]> {
    try {
      const techniquesFound = await this.db.Technique.findAll({ where: params })
      return techniquesFound
    } catch (e) {
      throw new ErrorGenerator('Server.internal', e)
    }
  }

  async create(techniques: TechniqueCreateInterface[]): Promise<TechniqueInstance[]> {
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
