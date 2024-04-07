import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import LoadingButton from '@frontend-graphql/ui-kit/LoadingButton';

import { deletePost } from '@frontend-graphql/api/posts';
import { Routes } from '@frontend-graphql/constants/Routes';
import useNotifications from '@frontend-graphql/hooks/useNotifications';
import { CustomError } from '@frontend-graphql/types';

export default function DeletePost() {
  const { postId = '' } = useParams();

  const navigate = useNavigate();
  const { handleSuccess, handleError } = useNotifications();

  const [isOpen, setIsOpen] = useState(false);

  const { posts } = Routes;

  const handleClose = () => {
    setIsOpen(false);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      handleSuccess('Post deleted');
      handleClose();
      navigate(`/${posts.baseRoutes.URL}`);
    },
    onError: (error: CustomError) => handleError(error),
  });

  const handleSubmit = () => mutate(postId);

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
