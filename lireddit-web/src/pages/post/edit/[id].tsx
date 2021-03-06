import { Box, Button } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import InputField from '../../../components/InputField'
import Layout from '../../../components/Layout'
import { usePostQuery, useUpdatePostMutation } from '../../../generated/graphql'
import { useGetIntId } from '../../../utils/useGetIntId'
import { withApollo } from '../../../utils/withApollo'

const EditPost = () => {
  const router = useRouter()
  const intId = useGetIntId()
  const { data, error, loading } = usePostQuery({
    skip: intId === -1,
    variables: {
      id: intId,
    },
  })
  const [updatePost] = useUpdatePostMutation()
  if (loading) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    )
  }

  if (error) {
    return <div>{error.message}</div>
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>could not find post</Box>
      </Layout>
    )
  }
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: data.post.title, text: data.post.text }}
        onSubmit={async (values) => {
          await updatePost({ variables: { id: intId, ...values } })
          router.back()
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" label="Title" placeholder="title" />
            <Box mt={4}>
              <InputField
                textarea
                name="text"
                label="Body"
                placeholder="text..."
              />
            </Box>
            <Button
              type="submit"
              mt={4}
              isLoading={isSubmitting}
              colorScheme="blue"
            >
              Update Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default withApollo({ ssr: false })(EditPost)
