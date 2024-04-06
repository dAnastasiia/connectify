import { useRoutes } from 'react-router-dom';

import { Routes } from '@frontend/constants/Routes';
import useAuth from '@frontend/hooks/useAuth';
import { ExternalLayout, InternalLayout } from '@frontend/layouts';
import Loader from '@frontend/ui-kit/Loader';

import FeedPage from '@frontend/pages/Feed';
import LoginPage from '@frontend/pages/Login';
import NotFoundPage from '@frontend/pages/NotFound';
import PostPage from '@frontend/pages/Post';
import SignupPage from '@frontend/pages/Signup';

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
