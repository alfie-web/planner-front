import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
	uri: 'http://localhost:8000/graphql',
	cache: new InMemoryCache()
});

export default client;



// import { resolvers, typeDefs } from "./resolvers";

// const client = new ApolloClient({
// 	cache,
// 	link: new HttpLink({
// 		uri: "http://localhost:4000/graphql",
// 		headers: {
// 			authorization: localStorage.getItem("token")
// 		}
// 	})
// 	,

// 	typeDefs, resolvers
// }
// )
// 	;

// client.cache.writeData({
// 	data: {
// 		editedTask: null
// 	}
// });