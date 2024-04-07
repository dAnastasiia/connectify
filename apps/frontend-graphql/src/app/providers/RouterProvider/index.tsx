import { useRoutes } from 'react-router-dom';

import { Routes } from '@frontend-graphql/constants/Routes';
import useAuth from '@frontend-graphql/hooks/useAuth';
import { ExternalLayout, InternalLayout } from '@frontend-graphql/layouts';
import Loader from '@frontend-graphql/ui-kit/Loader';

import FeedPage from '@frontend-graphql/pages/Feed';
import LoginPage from '@frontend-graphql/pages/Login';
import NotFoundPage from '@frontend-graphql/pages/NotFound';
import PostPage from '@frontend-graphql/pages/Post';
import SignupPage from '@frontend-graphql/pages/Signup';

import AuthGuard from './AuthGuard';
import PrivateRoute from './PrivateRoute';

export default function RouterProvider() {
  const { isLoading } = useAuth();
  const { home, posts, login, signup } = Routes;

  return useRoutes([
    {
      element: (
        <AuthGuard>
          <ExternalLayout />
        </AuthGuard>
      ),
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
      element: (
        <PrivateRoute>
          {isLoading ? <Loader isGlobal /> : <InternalLayout />}
        </PrivateRoute>
      ),

      children: [
        {
          path: home.baseRoutes.URL,
          element: <p>Home Page</p>,
        },

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

    {
      element: <ExternalLayout />,
      children: [{ path: '*', element: <NotFoundPage /> }],
    },
  ]);
}
