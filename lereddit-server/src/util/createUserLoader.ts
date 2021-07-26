import DataLoader from 'dataloader'
import { User } from '../entities/User'

// [1,78,8,10]
// [{id:1,username: 'ben'},{},{},{}]

export const createUserLoader = () =>
  new DataLoader<number, User>(async (userIds) => {
    const users = await User.findByIds(userIds as number[])
    const userIdToUser: Record<number, User> = {}
    users.forEach((user) => {
      userIdToUser[user.id] = user
    })

    return userIds.map((userId) => userIdToUser[userId])
  })
