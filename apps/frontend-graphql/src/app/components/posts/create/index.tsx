import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from '@mui/material';

import { FormInput, PhotoInput } from '@frontend-graphql/ui-kit/CustomInputs';
import LoadingButton from '@frontend-graphql/ui-kit/LoadingButton';

import { useCreatePost } from '@frontend-graphql/api/posts';
import useNotifications from '@frontend-graphql/hooks/useNotifications';
import { CustomError, ICreatePost } from '@frontend-graphql/types';

import { formParams } from './helpers';

export default function CreatePost() {
  const queryClient = useQueryClient();
  const form = useForm(formParams);
  const { handleSuccess, handleErrors } = useNotifications();

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    form.reset();
  };

  const { mutate, isPending } = useCreatePost({
    onSuccess: () => {
      handleSuccess('Post created');
      handleClose();
      // queryClient.invalidateQueries({ queryKey: ['posts'] }); // * refetch posts
    },
    onError: (errors: CustomError[]) => handleErrors(errors),
  });

  const handleSubmit = (data: ICreatePost) => mutate(data);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>New post</Button>

      <FormProvider {...form}>
        <Dialog
          component="form"
          onSubmit={form.handleSubmit(handleSubmit)}
          onClose={handleClose}
          open={isOpen}
          fullWidth
        >
          <DialogTitle>New post</DialogTitle>

          <DialogContent>
            <DialogContentText>
              Please fill all fields to add your awesome post.
            </DialogContentText>

            <Stack sx={{ pt: 2 }}>
              <FormInput label="Title" name="title" />

              <PhotoInput name="image" />

              <FormInput label="Content" name="content" multiline rows={5} />
            </Stack>
          </DialogContent>

          <DialogActions>
            <Button variant="text" onClick={handleClose}>
              Cancel
            </Button>

            <LoadingButton label="Create" loading={isPending} />
          </DialogActions>
        </Dialog>
      </FormProvider>
    </>
  );
}
