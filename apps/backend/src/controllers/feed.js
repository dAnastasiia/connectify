import { DateTime } from 'luxon';

export const getPosts = (req, res, next) => {
  res.status(200).json({
    data: [
      {
        _id: 'qwerty',
        author: 'J. K. Rowling',
        title: 'First Post',
        content:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum perspiciatis a repellat quidem corrupti non, est quisquam? Sunt vel eum labore, beatae, totam quia iusto odit nulla quibusdam dignissimos doloribus tempore voluptatibus unde dolor dolore facilis maxime rerum, voluptates deserunt sapiente fugiat soluta velit distinctio. Quasi fuga eos ullam nisi.',
        imageUrl: 'images/bicycle.jpg',
        createdAt: DateTime.now(),
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
