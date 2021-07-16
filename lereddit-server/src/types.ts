import { EntityManager, IDatabaseDriver, Connection } from '@mikro-orm/core'
import { Request, Response } from 'express'
import session from 'express-session'
import { Redis } from 'ioredis'

export type MyContext = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>
  req: Request & {
    session: session.Session & Partial<session.SessionData> & any
  }
  redis: Redis
  res: Response
}
