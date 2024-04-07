import { useNavigate } from 'react-router-dom';

import { FormProvider, useForm } from 'react-hook-form';

import { Link, Stack } from '@mui/material';

import AuthForm from '@frontend-graphql/ui-kit/AuthForm';
import {
  FormInput,
  PasswordInput,
} from '@frontend-graphql/ui-kit/CustomInputs';
import LoadingButton from '@frontend-graphql/ui-kit/LoadingButton';

import { useSignup } from '@frontend-graphql/api/auth';
import { Routes } from '@frontend-graphql/constants/Routes';
import useNotifications from '@frontend-graphql/hooks/useNotifications';
import { CustomError } from '@frontend-graphql/types';

import { formParams, ISignupForm } from './helpers';

export default function SignupForm() {
  const navigate = useNavigate();

  const form = useForm(formParams);
  const { handleSuccess, handleErrors } = useNotifications();

  const { login } = Routes;

  const { mutate, isPending } = useSignup({
    onSuccess: () => {
      navigate(`/${login.baseRoutes.URL}`);
      handleSuccess("You're succesfully signed up");
    },
    onError: (errors: CustomError[]) => handleErrors(errors),
  });

  const handleSubmit = (data: ISignupForm) => {
    const { name, email, password } = data;
    mutate({ name, email, password });
  };

  return (
    <AuthForm title="Sign up">
      <FormProvider {...form}>
        <Stack
          noValidate
          component="form"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormInput label="Name" name="name" autoComplete="full-name" />
          <FormInput label="Email" name="email" autoComplete="email" />
          <PasswordInput
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
          />
          <PasswordInput
            label="Confirm password"
            name="passwordConfirmation"
            type="password"
            autoComplete="confirm-new-password"
          />

          <LoadingButton label="Sign Up" fullWidth loading={isPending} />

          <Link href={login.baseRoutes.URL} alignSelf="center" variant="body2">
            Already have an account? Log In
          </Link>
        </Stack>
      </FormProvider>
    </AuthForm>
  );
}
