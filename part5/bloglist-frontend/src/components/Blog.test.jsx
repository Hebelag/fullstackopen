import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

test('renders collapsed blog (5.13)', () => {
  const blog = {
    title:'The internets search engine',
    author:'Google',
    url:'http://google.com',
    likes:1234
  }

  render(<Blog blog={blog} />)


  const titleElement = screen.getByText('The internets search engine', { exact: false })
  const authorElement = screen.getByText('Google', { exact: false })
  const urlElement = screen.queryByText('http://google.com')
  const likesElement = screen.queryByText('1234')

  expect(titleElement).toBeVisible()
  expect(authorElement).toBeVisible()
  expect(urlElement).toBeNull()
  expect(likesElement).toBeNull()
})

test('expand the blog and like the blog twice (5.14 + 5.15)', async () => {
  const blog = {
    title:'Event Handler',
    author:'Button',
    url:'http://click-me.com',
    likes:1234
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} addLike={mockHandler}/>)

  // open the blog details
  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  // expect to see the likes counter
  const element = screen.getByText('likes', { exact:false })
  expect(element).toBeVisible()

  // clicks the like button
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

