import { Box, Button, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react'
import Layout from '../components/Layout'
import { usePostsQuery } from '../generated/graphql'
import NextLink from 'next/link'
import UpdootSection from '../components/UpdootSection'
import EditDeletePostButtons from '../components/EditDeletePostButtons'
import { withApollo } from '../utils/withApollo'

const Index = () => {
  const { data, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 15,
      cursor: null as null | string,
    },
    notifyOnNetworkStatusChange: true,
  })

  if (!loading && !data) {
    return <div>You got query failed for some reason</div>
  }
  return (
    <Layout>
      {!data && loading ? (
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
                    <Box ml="auto">
                      <EditDeletePostButtons
                        id={post.id}
                        creatorId={post.creator.id}
                      />
                    </Box>
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
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor:
                    data.posts.posts[data.posts.posts.length - 1].createdAt,
                },
                // updateQuery: (
                //   previousValue,
                //   { fetchMoreResult }
                // ): PostsQuery => {
                //   if (!fetchMoreResult) {
                //     return previousValue as PostsQuery
                //   }
                //   return {
                //     __typename: 'Query',
                //     posts: {
                //       __typename: 'PaginatedPosts',
                //       hasMore: (fetchMoreResult as PostsQuery).posts.hasMore,
                //       posts: [
                //         ...(previousValue as PostsQuery).posts.posts,
                //         ...(fetchMoreResult as PostsQuery).posts.posts,
                //       ],
                //     },
                //   }
                // },
              })
            }}
            isLoading={loading}
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

export default withApollo({ ssr: true })(Index)
