import React from  'react'
import '@testing-library/jest-dom/extend-expect'
import { render,fireEvent } from '@testing-library/react'
import CreateBlog from './CreateBlog'

test('test a form list',() => {
  const mockHandler = jest.fn()
  const component = render(
    <CreateBlog handleOnCreate={mockHandler}/>
  )

  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')
  fireEvent.change(author, {
    target: { value: 'testing of forms could be easier' }
  })
  fireEvent.change(url, {
    target: { value: 'http://www.baidu.com' }
  })
  fireEvent.submit(form)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].url).toBe('http://www.baidu.com')
})