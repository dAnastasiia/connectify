import { useRoutes } from 'react-router-dom';

import { ExternalLayout, InternalLayout } from '@frontend/layouts';

import FeedPage from '@frontend/pages/Feed';
import LoginPage from '@frontend/pages/Login';
import NotFoundPage from '@frontend/pages/NotFound';
import SignupPage from '@frontend/pages/Signup';
import { Routes } from '@frontend/constants/Routes';

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
