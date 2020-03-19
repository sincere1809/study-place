import db from '../../db';

const Query = {
    health: () => 'The application is alive!',
    users: () => db.users.list(),
    posts: () => db.posts.list(),
    post: (root, { id }) => db.posts.get(id)
}

const Mutation = {
    addUser: (root, { user }) => {
        const newUserId = db.users.create(user);
        return db.users.get(newUserId);
    },
    addPost: (root, { by, post }) => {
        const newPostId = db.posts.create({
            ...post,
            createdBy: by,
            createdAt: Date.now().toString()
        });
        return db.posts.get(newPostId);
    },
    addComment: (parent, { by, on, comment }) => {
        const newCommentId = db.comments.create({
            ...comment,
            commentBy: by,
            commentOn: on,
            commentAt: Date.now().toString()
        });
        return db.comments.get(newCommentId);
    }
}

const Post = {
    createdBy: (post) => db.users.get(post.createdBy),
    comments: (post) => db.comments.list().filter((comment) => comment.commentOn === post.id)
}

const Comment = {
    commentBy: (comment) => db.users.get(comment.createdBy),
    comments: (comment) => db.comments.list().filter((item) => item.commentOn === comment.id)
}

export default { Query, Mutation, Post, Comment }
