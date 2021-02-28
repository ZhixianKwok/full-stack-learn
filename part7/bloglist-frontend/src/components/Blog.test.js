import React from  'react'
import '@testing-library/jest-dom/extend-expect'
import { render,fireEvent } from '@testing-library/react'
import Blog from './Blog'


test('renders title',() => {
  const blog = {
    'title':'this is a test blog3',
    'author':'amos oho',
    'url':'http://www.baidu.com',
    'likes':15,
    'userId':'5feafcdc782a7e955fa0821d'
  }
  const component = render(
    <Blog blog={blog}/>
  )

  expect(component.container).toHaveTextContent('this is a test blog3')
})

test('toggled blog details can be closed',() => {
  const blog = {
    'title':'this is a test blog3',
    'author':'amos oho',
    'url':'http://www.baidu.com',
    'likes':15,
    'userId':'5feafcdc782a7e955fa0821d'
  }
  const component = render(
    <Blog blog={blog}/>
  )
  //   expect(component.container).toHaveTextContent('')

  const buttonShow = component.getByText('view')
  fireEvent.click(buttonShow)

  expect(component.container).toHaveTextContent('http://www.baidu.com')

  const likes = component.container.querySelector('.likes')
  expect(likes.innerHTML).toEqual(blog.likes.toString())

  const url = component.container.querySelector('.url')
  expect(url.innerHTML).toEqual('http://www.baidu.com')

})


test('click the Like button twice, and the event handler for the component that is received as props is created twice',() => {

  const blog = {
    'title':'this is a test blog3',
    'author':'amos oho',
    'url':'http://www.baidu.com',
    'likes':15,
    'userId':'5feafcdc782a7e955fa0821d'
  }
  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={blog} updateBlog={mockHandler}/>
  )
  //unfold
  const buttonShow = component.getByText('view')
  fireEvent.click(buttonShow)
  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

