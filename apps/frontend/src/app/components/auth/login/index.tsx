import { useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';

import { Stack } from '@mui/material';

import AuthForm from '@frontend/ui-kit/AuthForm';
import { FormInput } from '@frontend/ui-kit/CustomInputs';
import LoadingButton from '@frontend/ui-kit/LoadingButton';

import { login } from '@frontend/api/auth';
import { Routes } from '@frontend/constants/Routes';
import useNotifications from '@frontend/hooks/useNotifications';
import { CustomError, ILogin } from '@frontend/types';

import { formParams } from './helpers';

export default function LoginForm() {
  const navigate = useNavigate();

  const form = useForm(formParams);
  const { handleError } = useNotifications();

  const { feed, posts } = Routes;

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate(`/${feed.baseRoutes.URL}/${posts.baseRoutes.URL}`);
    },
    onError: (error: CustomError) => handleError(error),
  });

  const handleSubmit = (data: ILogin) => mutate(data);

  return (
    <AuthForm title="Log in">
      <FormProvider {...form}>
        <Stack
          noValidate
          component="form"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormInput label="Email" name="email" />
          <FormInput label="Password" name="password" type="password" />

          <LoadingButton label="Log in" fullWidth loading={isPending} />
        </Stack>
      </FormProvider>
    </AuthForm>
  );
}
