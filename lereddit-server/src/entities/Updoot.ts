import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { Field, ObjectType } from 'type-graphql'
import { User } from './User'
import { Post } from './Post'

// m to n
// many to many
// user <-> posts
// user -> join table <- posts
// user -> updot <- posts

@Entity()
export class Updoot extends BaseEntity {
  @Column({ type: 'int' })
  value: number

  @PrimaryColumn()
  userId: number

  @ManyToOne(() => User, (user) => user.updoots)
  user: User

  @PrimaryColumn()
  postId: number

  @ManyToOne(() => Post, (post) => post.updoots)
  post: Post
}