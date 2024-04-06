import { useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Paper, Stack, Typography, useTheme } from '@mui/material';

import { FormInput } from '@frontend/ui-kit/CustomInputs';
import LoadingButton from '@frontend/ui-kit/LoadingButton';

import useNotifications from '@frontend/hooks/useNotifications';

import { signup } from '@frontend/api/auth';
import { Routes } from '@frontend/constants/Routes';
import { CustomError } from '@frontend/types';

import { formParams, ISignupForm } from './helpers';

export default function SignupForm() {
  const navigate = useNavigate();
  const { breakpoints, spacing } = useTheme();

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
    <Paper
      sx={{
        p: 3,
        width: 1,
        [breakpoints.up('md')]: {
          maxWidth: spacing(70),
        },
      }}
    >
      <Stack alignItems="center">
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
      </Stack>

      <FormProvider {...form}>
        <Stack
          noValidate
          component="form"
          onSubmit={form.handleSubmit(handleSubmit)}
          sx={{ my: 3 }}
        >
          <FormInput label="Name" name="name" autoComplete="full-name" />
          <FormInput label="Email" name="email" autoComplete="email" />
          <FormInput
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
          />
          <FormInput
            label="Confirm password"
            name="passwordConfirmation"
            type="password"
            autoComplete="confirm-new-password"
          />

          <LoadingButton label="Sign Up" fullWidth loading={isPending} />
        </Stack>
      </FormProvider>
    </Paper>
  );
}
