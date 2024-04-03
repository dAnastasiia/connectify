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

import { FormInput, PhotoInput } from '@frontend/ui-kit/CustomInputs';
import LoadingButton from '@frontend/ui-kit/LoadingButton';

import { createPost } from '@frontend/api/posts';
import useNotifications from '@frontend/hooks/useNotifications';
import { CustomError, ICreatePost } from '@frontend/types';

import { formParams } from './helpers';

interface CreatePostProps {
  onCreate: () => void;
}

export default function CreatePost({ onCreate }: CreatePostProps) {
  const form = useForm(formParams);
  const { handleSuccess, handleError } = useNotifications();

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    form.reset();
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      handleSuccess('Post created');
      handleClose();
      onCreate();
    },
    onError: (error: CustomError) => handleError(error),
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
              <FormInput label="Title" name="title" type="text" fullWidth />

              <PhotoInput name="image" />

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
