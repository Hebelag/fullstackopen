import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { expect } from 'vitest'

test('calls the eventHandler when form is posted, containing the right details (5.16)', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm
    handleAddBlog={createBlog}
  />)

  const titleInput = screen.getByLabelText('title')
  const authorInput = screen.getByLabelText('author')
  const urlInput = screen.getByLabelText('url')

  const sendButton = screen.queryByText('add blog')

  await user.type(titleInput, 'Testing Title')
  await user.type(authorInput, 'Vitester')
  await user.type(urlInput, 'localhost')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  console.log(createBlog.mock.calls[0][0].title)
  console.log(createBlog.mock.calls[0][0].author)
  console.log(createBlog.mock.calls[0][0].url)
})