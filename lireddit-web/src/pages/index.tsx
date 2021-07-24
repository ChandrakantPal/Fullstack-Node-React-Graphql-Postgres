import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import Layout from '../components/Layout'
import {
  useDeletePostMutation,
  useMeQuery,
  usePostsQuery,
} from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'
import NextLink from 'next/link'
import { useState } from 'react'
import UpdootSection from '../components/UpdootSection'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  })

  const [{ data: meData }] = useMeQuery()
  const [{ data, fetching }] = usePostsQuery({
    variables,
  })

  const [, deletePost] = useDeletePostMutation()

  if (!fetching && !data) {
    return <div>You got query failed for some reason</div>
  }
  return (
    <Layout>
      {!data && fetching ? (
        <div>Loading...</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts?.posts?.map((post) =>
            !post ? null : (
              <Flex key={post.id} p={5} shadow="md" borderWidth="1px">
                <UpdootSection post={post} />
                <Box flex={1}>
                  <NextLink href="/post/[id]" as={`/post/${post.id}`}>
                    <Link>
                      <Heading fontSize="xl">{post.title}</Heading>
                    </Link>
                  </NextLink>
                  <Text>posted by {post.creator.username}</Text>
                  <Flex align="center">
                    <Text flex={1} mt={4}>
                      {post.textSnippet}
                    </Text>
                    {meData?.me?.id === post.creator.id && (
                      <Box ml="auto">
                        <NextLink
                          href="/post/edit/[id]"
                          as={`/post/edit/${post.id}`}
                        >
                          <IconButton
                            as={Link}
                            mr={4}
                            aria-label="Edit Post"
                            icon={<EditIcon />}
                          />
                        </NextLink>
                        <IconButton
                          aria-label="Delete Post"
                          icon={<DeleteIcon />}
                          onClick={() => {
                            deletePost({ id: post.id })
                          }}
                        />
                      </Box>
                    )}
                  </Flex>
                </Box>
              </Flex>
            )
          )}
        </Stack>
      )}
      {data && data.posts.hasMore && (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              })
            }}
            isLoading={fetching}
            m="auto"
            my={8}
          >
            load more
          </Button>
        </Flex>
      )}
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
