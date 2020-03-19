import express from 'express';
import bodyPaser from 'body-parser';
import cors from 'cors';
import * as fs from 'fs';
import * as path from 'path';
import { ApolloServer, gql } from 'apollo-server-express';
import resolvers from './graphql/resolvers';

const app = express();
const port = process.env.port || 8000;

app.use(cors(), bodyPaser.json());

const typeDefs = gql(fs.readFileSync(path.resolve(__dirname, 'graphql/schema.graphql'), { encoding: 'utf8' }));
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen(port, () => {
   console.log(`Server is running at http://localhost:${port}${server.graphqlPath}`); 
});