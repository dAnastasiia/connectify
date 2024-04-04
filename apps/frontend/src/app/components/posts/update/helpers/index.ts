import { ValidationMode } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import validationSchema from './validationShema';
import { IPost } from '@frontend/types';

export const formParams = (data?: IPost) => {
  return {
    mode: 'onChange' as keyof ValidationMode,
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: data?.title || '',
      content: data?.content || '',
      image: null as unknown as File,
    },
  };
};
