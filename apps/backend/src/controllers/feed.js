import { DateTime } from 'luxon';

export const getPosts = (req, res, next) => {
  res.status(200).json({
    data: [
      {
        author: 'J. K. Rowling',
        title: 'First Post',
        content: 'Lorem ipsum...',
        imageUrl: 'images/bicycle.jpg',
        date: DateTime.now(),
      },
    ],
  });
};

export const createPost = (req, res, next) => {
  const { title, content } = req.body;

  res.status(201).json({
    message: 'Successfully created',
    post: { id: Date.now(), title, content },
  });
};
