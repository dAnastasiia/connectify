import { useContext, useEffect, useState } from 'react';

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

import { useUpdatePost } from '@frontend-graphql/api/posts';
import { PostContext } from '@frontend-graphql/contexts/PostContext';
import useNotifications from '@frontend-graphql/hooks/useNotifications';
import { CustomError, IUpdatePost } from '@frontend-graphql/types';

import { formParams, IUpdatePostForm } from './helpers';

export default function UpdatePost() {
  const queryClient = useQueryClient();
  const { data } = useContext(PostContext);

  const form = useForm(formParams(data));
  useEffect(() => {
    form.reset(data); // * Update form values when data changes
  }, [data]);

  const { handleSuccess, handleErrors } = useNotifications();

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    form.reset();
  };

  const { mutate, isPending } = useUpdatePost({
    onSuccess: () => {
      handleSuccess('Post updated');
      handleClose();
      queryClient.invalidateQueries({ queryKey: [data._id] });
    },
    onError: (errors: CustomError[]) => handleErrors(errors),
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
