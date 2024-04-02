import { Navigate, useRoutes } from 'react-router-dom';

import { ExternalLayout, InternalLayout } from '../../layouts';
import NotFoundPage from '../../pages/NotFound';

import { Routes } from '../../constants/Routes';
import LoginPage from '../../pages/Login';
import SignupPage from '../../pages/Signup';
import FeedPage from '../../pages/Feed';

export default function RouterProvider() {
  const { home, feed, posts, login, signup } = Routes;

  return useRoutes([
    {
      element: <ExternalLayout />,
      children: [
        {
          path: login.baseRoutes.URL,
          element: <LoginPage />,
        },
        {
          path: signup.baseRoutes.URL,
          element: <SignupPage />,
        },
      ],
    },
    {
      element: <InternalLayout />,
      children: [
        {
          path: home.baseRoutes.URL,
          element: <p>Home Page</p>,
        },

        {
          path: feed.baseRoutes.URL,
          children: [
            {
              path: posts.baseRoutes.URL,
              element: <FeedPage />,
            },
          ],
        },
      ],
    },

    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);
}
