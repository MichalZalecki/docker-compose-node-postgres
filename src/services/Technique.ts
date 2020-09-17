import { DBInterface } from '../typings/DbInterface'
import { TechniqueAttributes } from '../models/Technique'
import ErrorGenerator from '../error'

export interface TechniqueFindParams extends Partial<Omit<TechniqueAttributes, 'videoLink'>> {}

export default class Technique {
  private db: DBInterface
  private eagerAttributes: {
    recipes: string[]
  }
  constructor(db: DBInterface) {
    this.db = db
    this.eagerAttributes = {
      recipes: ['key', 'title', 'description'],
    }
  }

  async find(params?: TechniqueFindParams): Promise<TechniqueFindParams[]> {
    try {
      const techniquesFound = await this.db.Technique.findAll({ 
        where: params, 
        include: [
        {
          model: this.db.Recipe,
          as: 'recipes',
          attributes: this.eagerAttributes.recipes,
        }
      ],
    })
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
