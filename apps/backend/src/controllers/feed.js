export const getPosts = (req, res, next) => {
  res
    .status(200)
    .json({ posts: [{ title: 'First Post', content: 'Lorem ipsum...' }] });
};

export const createPost = (req, res, next) => {
  const { title, content } = req.body;

  res.status(201).json({
    message: 'Successfully created',
    post: { id: Date.now(), title, content },
  });
};
