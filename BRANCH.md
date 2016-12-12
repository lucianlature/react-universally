<img src="https://raw.githubusercontent.com/apollostack/apollo/master/logo-apollo.png" alt="Apollo datat stack for modern apps" width="255px" />

  Apollo makes fetching the exact data you need for your component easy and allows you to put your queries exactly where you need them.

  Thanks to Apollo's caching store, you can use GraphQL mutations to change your data and see the results reflected in your UI automatically.

## Apollo

### Client
```js
import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

// The data prop, which is provided by the wrapper below contains,
// a `loading` key while the query is in flight and posts when it is ready
function PostList({ data: { loading, posts } }) {
  if (loading) {
    return <div>Loading</div>;
  } else {
    return (
      <ul>
        {posts.map(post =>
          <li key={post.id}>
            {post.title} by {' '}
            {post.author.firstName} {post.author.lastName} {' '}
            ({post.votes} votes)
          </li>
        )}
      </ul>
    );
  }
}

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList here)
export default graphql(gql`
  query allPosts {
    posts {
      id
      title
      votes
      author {
        id
        firstName
        lastName
      }
    }
  }
`)(PostList);
```

### Schema
```js
type Author {
  id: Int! # the ! means that every author object _must_ have an id
  firstName: String
  lastName: String
  posts: [Post] # the list of Posts by this author
}

type Post {
  id: Int!
  title: String
  author: Author
  votes: Int
}

# the schema allows the following query:
type Query {
  posts: [Post]
}
```

## About

This is the `incubator/state/apollo` branch of the `react-universally` starter kit.

It provides you with the build tooling and configuration you need to kick off your next universal react apollo project.

# License

  MIT