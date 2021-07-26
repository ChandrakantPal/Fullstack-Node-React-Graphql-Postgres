import { Request, Response } from 'express'
import session from 'express-session'
import { Redis } from 'ioredis'
import { createUpdootLoader } from './util/createUpdootLoader'
import { createUserLoader } from './util/createUserLoader'

export type MyContext = {
  req: Request & {
    session: session.Session & Partial<session.SessionData> & any
  }
  redis: Redis
  res: Response
  userLoader: ReturnType<typeof createUserLoader>
  updootLoader: ReturnType<typeof createUpdootLoader>
}
