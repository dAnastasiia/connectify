import React, { ChangeEvent, useState } from 'react';

import { useController, useFormContext } from 'react-hook-form';

import {
  Box,
  FormControl,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

import { environment } from '../../../../environments/environment';

interface PhotoProps {
  name: string;
  imageUrl?: string;
}

export default function Photo({ name, imageUrl }: PhotoProps) {
  const [uploadedPhoto, setUploadedPhoto] = useState('');
  const { spacing, palette } = useTheme();

  const { control, setValue } = useFormContext();
  const {
    fieldState: { error },
  } = useController({ name, control });

  const [isHover, setIsHover] = useState(false);

  const handleInputClick = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    target.value = '';
    setIsHover(true);
  };

  const setFile = (files: FileList) => {
    setValue(name, files[0], { shouldValidate: true });

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      setUploadedPhoto(reader.result as string);
    };
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (files?.length) setFile(files);
    setIsHover(false);
  };

  const onDragOver = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsHover(true);
  };

  const onDragLeave = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsHover(false);
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsHover(false);

    const files = event.dataTransfer.files;
    if (files?.length) setFile(files);
  };

  const isFileCorrect = !error?.message && uploadedPhoto;

  return (
    <FormControl fullWidth>
      <label>
        <TextField
          fullWidth
          style={{ textAlign: 'left' }}
          type="file"
          error={!!error}
          helperText={error?.message}
          onChange={handleFileUpload}
          onClick={handleInputClick}
        />
        <Box
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          sx={{
            width: 1,
            mt: 0.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: spacing(10),
            borderStyle: 'dashed',
            borderColor: palette.grey[700],
            borderWidth: 2,
            cursor: 'pointer',
            backgroundColor: palette.common.white,

            ...(isHover && { backgroundColor: palette.grey[200] }),
          }}
        >
          {imageUrl && !uploadedPhoto && (
            <Box
              width={1}
              component="img"
              src={`${environment.API_URL}${imageUrl}`}
              sx={{ objectFit: 'contain', maxHeight: spacing(30) }}
            />
          )}

          {isFileCorrect && (
            <Box
              width={1}
              component="img"
              src={uploadedPhoto}
              sx={{ objectFit: 'contain', maxHeight: spacing(30) }}
            />
          )}

          {!imageUrl && (!uploadedPhoto || !isFileCorrect) && (
            <Typography variant="h6">Select image</Typography>
          )}
        </Box>
      </label>
    </FormControl>
  );
}
