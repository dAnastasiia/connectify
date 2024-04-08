import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import LoadingButton from '@frontend-graphql/ui-kit/LoadingButton';

import { useDeletePost } from '@frontend-graphql/api/posts';
import { Routes } from '@frontend-graphql/constants/Routes';
import useNotifications from '@frontend-graphql/hooks/useNotifications';
import { CustomError } from '@frontend-graphql/types';
import { PostContext } from '@frontend-graphql/contexts/PostContext';

export default function DeletePost() {
  const { data } = useContext(PostContext);

  const navigate = useNavigate();
  const { handleSuccess, handleErrors } = useNotifications();

  const [isOpen, setIsOpen] = useState(false);

  const { posts } = Routes;

  const handleClose = () => {
    setIsOpen(false);
  };

  const { mutate, isPending } = useDeletePost({
    onSuccess: () => {
      handleSuccess('Post deleted');
      handleClose();
      navigate(`/${posts.baseRoutes.URL}`);
    },
    onError: (errors: CustomError[]) => handleErrors(errors),
  });

  const handleSubmit = () => mutate(data._id);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Delete</Button>

      <Dialog onClose={handleClose} open={isOpen} fullWidth>
        <DialogTitle>Delete post</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this post?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button variant="text" onClick={handleClose}>
            Cancel
          </Button>

          <LoadingButton
            label="Delete"
            loading={isPending}
            onClick={handleSubmit}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}
