import { FormProvider, useForm } from 'react-hook-form';

import { Link, Stack } from '@mui/material';

import AuthForm from '@frontend-graphql/ui-kit/AuthForm';
import {
  FormInput,
  PasswordInput,
} from '@frontend-graphql/ui-kit/CustomInputs';
import LoadingButton from '@frontend-graphql/ui-kit/LoadingButton';

import { Routes } from '@frontend-graphql/constants/Routes';
import useAuth from '@frontend-graphql/hooks/useAuth';

import { formParams } from './helpers';

export default function LoginForm() {
  const form = useForm(formParams);
  const { handleLogin, isLoading } = useAuth();

  const { signup } = Routes;

  return (
    <AuthForm title="Log in">
      <FormProvider {...form}>
        <Stack
          noValidate
          component="form"
          onSubmit={form.handleSubmit(handleLogin)}
        >
          <FormInput label="Email" name="email" autoComplete="current-email" />
          <PasswordInput
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
          />

          <LoadingButton label="Log in" fullWidth loading={isLoading} />

          <Link href={signup.baseRoutes.URL} alignSelf="center" variant="body2">
            Don't have an account? Sign Up
          </Link>
        </Stack>
      </FormProvider>
    </AuthForm>
  );
}
