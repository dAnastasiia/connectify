import { useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';

import { Link, Stack } from '@mui/material';

import AuthForm from '@frontend/ui-kit/AuthForm';
import { FormInput, PasswordInput } from '@frontend/ui-kit/CustomInputs';
import LoadingButton from '@frontend/ui-kit/LoadingButton';

import { signup } from '@frontend/api/auth';
import { Routes } from '@frontend/constants/Routes';
import useNotifications from '@frontend/hooks/useNotifications';
import { CustomError } from '@frontend/types';

import { formParams, ISignupForm } from './helpers';

export default function SignupForm() {
  const navigate = useNavigate();

  const form = useForm(formParams);
  const { handleSuccess, handleError } = useNotifications();

  const { login } = Routes;

  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      handleSuccess("You're succesfully signed up");
      navigate(`/${login.baseRoutes.URL}`);
    },
    onError: (error: CustomError) => handleError(error),
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
