import { randomUUID } from 'crypto';
import { DateTime } from 'luxon';
import { validationResult } from 'express-validator';

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
        createdAt: '2024-04-01T19:04:15.729+03:00',
      },
    ],
  });
};

export const createPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log('errors: ', errors);
    res.status(422).json({
      message: 'Data is incorrect',
      errors: errors.array(),
    });
  }

  const { title, content } = req.body;

  const data = {
    _id: randomUUID(),
    title,
    content,
    author: 'J. K. Rowling',
    imageUrl: 'images/bicycle.jpg',
    createdAt: DateTime.now().toISO(),
  };
  console.log('BE data: ', data);

  res.status(201).json({
    message: 'Successfully created',
    data,
  });
};
