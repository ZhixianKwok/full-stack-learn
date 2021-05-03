const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./src/models/author')
const Book = require('./src/models/book')
const jwt = require('jsonwebtoken')

const MONGODB_URI = process.env.MONGODB_URI;
console.log('connecting to', MONGODB_URI);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
})

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!  
  }

  type Author {
    name:String!
    id: ID!
    born: Int
    bookCount:Int!
  }

  type Token {
    value: String!
  }
  
  type Query {
    me: User
  }
  

  type Mutation {
    addBook(title: String!,auting!,puhor: Strblished: Int!,genres: [String!]!
    ): Book,
    editAuthor(name:String!,setBornTo:Int!):Author,
    login(
      username: String!
      password: String!
    ): Token
  }

  type Token {
    value: String!
  }
  

`

const resolvers = {
  Query: {
    // bookCount:(root , args)=>{
    //     return Book.collection.countDocuments()
    // },
    authorCount:()=>{
        return Author.collection.countDocuments()
    },
    // allBooks: (root,args) => {
    //     return Book.find({});
    // },
    allAuthors: (root, args) => { 
        return Author.find({})
    }
  },

  Mutation: {
    addBook(root,args) {
      const book = new Book({ ...args })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor:(root,args) => {
      const author = await Author.findOne({ name: args.name })
      author.born = args.born
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secred' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id).populate('friends')
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})