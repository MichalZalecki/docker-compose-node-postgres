import { DBInterface } from '../typings/DbInterface'
import { TechniqueAttributes } from '../models/Technique'
import { mapQueryParams } from './helpers/mapper'

export interface TechniqueFindParams extends Partial<Omit<TechniqueAttributes, 'videoLink'>> {}
interface TechniquesData{
  data: TechniqueAttributes[]
  count: number
}
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

  async find(params: TechniqueFindParams): Promise<TechniquesData> {
    const { findParams, paginationParams } = mapQueryParams(
      params,
      ['id', 'key', 'title', 'description', 'userId'],
      ['limit', 'page']
    )
    try {
      const techniquesFound = await this.db.Technique.findAndCountAll({ 
        where: findParams,
        limit: paginationParams.limit,
        order: [["createdAt", 'DESC']],
        offset: paginationParams.limit && paginationParams.page && paginationParams.limit * paginationParams.page,
        include: [
        {
          model: this.db.Recipe,
          as: 'recipes',
          attributes: this.eagerAttributes.recipes,
        }
      ],
    })
      return {data: techniquesFound.rows.map((el) => el.get({ plain: true })), count: techniquesFound.count}
    } catch (e) {
      throw new Error(e)
    }
  }

  async create(techniques: TechniqueAttributes[]): Promise<TechniqueAttributes[]> {
    if (!techniques || !techniques.length) {
      throw new Error('No technique received')
    }

    try {
      const newTechnique = await this.db.Technique.bulkCreate(techniques)
      return newTechnique.map((el) => el.get({ plain: true }))
    } catch (e) {
      throw new Error(e)
    }
  }
}
