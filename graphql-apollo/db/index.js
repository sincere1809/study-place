import { DataStore } from 'notarealdb';
import * as path from 'path';

const store = new DataStore(path.resolve(__dirname, 'data'));

export default {
    companies: store.collection('companies'),
    jobs: store.collection('jobs'),
    users: store.collection('users'),
    posts: store.collection('posts'),
    comments: store.collection('comments')
}
