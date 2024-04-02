import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
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

import FormInput from '@frontend/ui-kit/FormInput';
import LoadingButton from '@frontend/ui-kit/LoadingButton';

import { createPost } from '@frontend/api/posts';
import useNotifications from '@frontend/hooks/useNotifications';
import { CustomError, ICreatePost, IPost, PostResponse } from '@frontend/types';

import { formParams } from './helpers';

export default function CreatePost() {
  const form = useForm(formParams);
  const { handleSuccess, handleError } = useNotifications();

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    form.reset();
    setIsOpen(false);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: ({ message }: PostResponse<IPost>) => {
      handleSuccess(message);
      handleClose();
    },
    onError: (error: CustomError) => handleError(error),
  });

  const handleSubmit = (data: ICreatePost) => {
    mutate(data);
  };

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
              <FormInput label="Title" name="title" type="text" fullWidth />
              <FormInput
                label="Content"
                name="content"
                multiline
                rows={3}
                fullWidth
              />
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
