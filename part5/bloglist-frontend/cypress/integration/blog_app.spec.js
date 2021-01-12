describe('Blog App',function(){
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user =  {
        name: 'admin',
        username: 'admin',
        password: '123321'
      }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    const testUser = {
      name:'test',
      username:'test',
      password:'test'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', testUser) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('#toggle').click()
    cy.get('html').contains('login to application')
  })

  it('succeeds with correct credentials', function() {
    cy.get('#toggle').click()
    cy.get('#username').type('admin')
    cy.get('#password').type('123321')
    cy.get('#login').click()
    cy.contains('admin logged in')
  })

  it('fails with wrong credentials', function() {
    cy.get('#toggle').click()
    cy.get('#username').type('admin')
    cy.get('#password').type('wrong')
    cy.get('#login').click()  
    
    cy.get('.error').should('contain','Incorrect user name or password entered!')
    .and('have.css','border-color','rgb(255, 0, 0)')
    .and('have.css','color','rgb(255, 0, 0)')
    cy.get('html').should('not.contain', 'admin logged in')
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'admin', password: '123321' })
    })

    it('a new blog can be created', function() {
      cy.contains('admin logged in')
      cy.get('#toggle').click()
      cy.get('#title').type('this is a test blog')
      cy.get('#author').type('admin') 
      cy.get('#url').type('http://example.com')
      cy.get('#new').click()
      cy.get('html').should('contain','this is a test blog')
    })
  })

  describe('blog can be exists',function () {
    beforeEach(function() {
      cy.login({ username: 'admin', password: '123321' })
      cy.createBlog({title:'this is a test blog3',author:'amos oho',url:'http://www.example.com',likes:15})
    })

    it('blog can be click likes',function() {    
        cy.get('input:last').should('have.attr', 'value', 'view').click()
        cy.contains('this is a test blog3')
        cy.get('#like').click()
        cy.contains('16')
    })

    it('blog can be removed',function() {
      cy.get('input:last').should('have.attr', 'value', 'view').click()
      cy.contains('this is a test blog3')
      cy.get('input:last').should('have.attr', 'value', 'remove').click()
      cy.get('html').should('not.contain','this is a test blog3')
    })
  })

  describe('blog can be deleted by their users',function() {
    beforeEach(function() {
      cy.login({ username: 'admin', password: '123321' })
      cy.createBlog({title:'this is a test blog3',author:'amos oho',url:'http://www.example.com',likes:15})
    })

    it('blog can not be removed by other user',function(){
      cy.visit('http://localhost:3000/')
      cy.login({ username: 'test', password: 'test' })

      cy.get('input:last').should('have.attr', 'value', 'view').click()
      cy.contains('http://www.example.com')
      cy.get('input:last').should('have.attr', 'value', 'remove').click()
      cy.get('html').should('contain','this is a test blog3')
    })
  })
  

  describe.only('check to see if blogs are sorted by preference',function() {
    beforeEach(function() {
      cy.login({ username: 'admin', password: '123321' })
      cy.createBlog({ title:'this is a test blog3',author:'amos oho',url:'http://www.example.com',likes:15})
      cy.createBlog({title:'this is a test blog4',author:'amos oho',url:'http://www.example.com',likes:17})
    })
    //first blog equal max value
    it('test max likes is 17',function() {
      cy.get('[value=view]:first').click()
      cy.get('.blog:first').contains('17')
    })
  })
})