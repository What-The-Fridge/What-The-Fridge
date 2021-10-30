import 'reflect-metadata';
// import { createConnection } from 'typeorm';
// import { User } from './entity/User';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { UserResolver } from './UserResolver';
import { buildSchema } from 'type-graphql';

(async () => {
	const app = express();
	app.get('/', (_req, res) => res.send('hello'));

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [UserResolver],
		}),
	});
	await apolloServer.start();
	apolloServer.applyMiddleware({ app });

	app.listen(4000, () => {
		console.log('express listening on port 4000');
	});
})();

// createConnection()
// 	.then(async connection => {
// 		console.log('Inserting a new user into the database...');
// 		const user = new User();
// 		user.firstName = 'Timber';
// 		user.lastName = 'Saw';
// 		user.age = 25;
// 		await connection.manager.save(user);
// 		console.log('Saved a new user with id: ' + user.id);

// 		console.log('Loading users from the database...');
// 		const users = await connection.manager.find(User);
// 		console.log('Loaded users: ', users);

// 		console.log('Here you can setup and run express/koa/any other framework.');
// 	})
// 	.catch(error => console.log(error));
