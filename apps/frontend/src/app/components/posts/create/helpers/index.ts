import { ValidationMode } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import validationSchema from './validationShema';

export const formParams = {
  mode: 'onChange' as keyof ValidationMode,
  resolver: yupResolver(validationSchema),
  defaultValues: {
    title: '',
    content: '',
    image: {} as File,
  },
};
