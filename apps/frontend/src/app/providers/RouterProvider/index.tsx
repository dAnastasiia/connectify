import { useRoutes } from 'react-router-dom';

import { Routes } from '@frontend/constants/Routes';
import { ExternalLayout, InternalLayout } from '@frontend/layouts';

import FeedPage from '@frontend/pages/Feed';
import LoginPage from '@frontend/pages/Login';
import NotFoundPage from '@frontend/pages/NotFound';
import PostPage from '@frontend/pages/Post';
import SignupPage from '@frontend/pages/Signup';

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
              children: [
                { index: true, element: <FeedPage /> },

                {
                  path: posts.baseRoutes.itemId,
                  children: [
                    {
                      index: true,
                      element: <PostPage />,
                    },
                  ],
                },
              ],
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
