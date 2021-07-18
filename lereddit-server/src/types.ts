import { Request, Response } from 'express'
import session from 'express-session'
import { Redis } from 'ioredis'

export type MyContext = {
  req: Request & {
    session: session.Session & Partial<session.SessionData> & any
  }
  redis: Redis
  res: Response
}
