interface InnerRoute {
  [key: string]: string;
}

interface BaseRoutes {
  URL: string;
  [key: string]: string;
}

interface NavObj {
  baseRoutes: BaseRoutes;
  [details: string]: InnerRoute;
}

interface MainRoutes {
  [key: string]: NavObj;
}

export const Routes: MainRoutes = {
  home: {
    baseRoutes: {
      URL: '/',
    },
  },

  login: {
    baseRoutes: {
      URL: 'login',
    },
  },

  signup: {
    baseRoutes: {
      URL: 'signup',
    },
  },

  posts: {
    baseRoutes: {
      URL: 'posts',
      itemId: ':postId',
    },
  },
};
