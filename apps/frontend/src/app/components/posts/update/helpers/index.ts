import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { ValidationMode } from 'react-hook-form';

import { IPost } from '@frontend/types';

import validationSchema from './validationShema';

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

export type IUpdatePostForm = yup.InferType<typeof validationSchema>;
