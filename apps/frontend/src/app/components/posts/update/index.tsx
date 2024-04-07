import { useContext, useEffect, useState } from 'react';

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

import { updatePost } from '@frontend/api/posts';
import { PostContext } from '@frontend/contexts/PostContext';
import useNotifications from '@frontend/hooks/useNotifications';
import { CustomError, IUpdatePost } from '@frontend/types';

import { formParams, IUpdatePostForm } from './helpers';

export default function UpdatePost() {
  const { data } = useContext(PostContext);

  const form = useForm(formParams(data));
  useEffect(() => {
    form.reset(data); // * Update form values when data changes
  }, [data]);

  const { handleSuccess, handleError } = useNotifications();

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    form.reset();
  };

  const { mutate, isPending } = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      handleSuccess('Post updated');
      handleClose();
      // onSuccess(); // * remove due to using sockets for update
    },
    onError: (error: CustomError) => handleError(error),
  });

  const handleSubmit = (formData: IUpdatePostForm) => {
    const id = data?._id || '';
    const imageUrl = data?.imageUrl || '';
    const dataObj: IUpdatePost = { id, ...formData, imageUrl };

    mutate(dataObj);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Edit</Button>

      <FormProvider {...form}>
        <Dialog
          component="form"
          onSubmit={form.handleSubmit(handleSubmit)}
          onClose={handleClose}
          open={isOpen}
          fullWidth
        >
          <DialogTitle>Edit post</DialogTitle>

          <DialogContent>
            <DialogContentText>Update needed info.</DialogContentText>

            <Stack sx={{ pt: 2 }}>
              <FormInput label="Title" name="title" type="text" fullWidth />

              <PhotoInput name="image" imageUrl={data?.imageUrl} />

              <FormInput
                label="Content"
                name="content"
                multiline
                rows={5}
                fullWidth
              />
            </Stack>
          </DialogContent>

          <DialogActions>
            <Button variant="text" onClick={handleClose}>
              Cancel
            </Button>

            <LoadingButton label="Update" loading={isPending} />
          </DialogActions>
        </Dialog>
      </FormProvider>
    </>
  );
}
