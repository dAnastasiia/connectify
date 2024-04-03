import React, { ChangeEvent, useState } from 'react';

import {
  Box,
  FormControl,
  FormHelperText,
  Typography,
  useTheme,
} from '@mui/material';
import { useController, useFormContext } from 'react-hook-form';

interface PhotoProps {
  name: string;
}

export default function Photo({ name }: PhotoProps) {
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
      <Box textAlign="center">
        <label>
          <input
            style={{ display: 'none' }}
            type="file"
            onChange={handleFileUpload}
            onClick={handleInputClick}
          />

          <Box
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            sx={{
              width: 1,
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
            {isFileCorrect ? (
              <Box
                component="img"
                src={uploadedPhoto}
                width={1}
                sx={{ objectFit: 'contain', maxHeight: spacing(30) }}
              />
            ) : (
              <Typography variant="h6">Select image</Typography>
            )}
          </Box>
        </label>

        <Box sx={{ marginTop: 1 }}>
          <FormHelperText error={!!error}>
            {error?.message || ' '}
          </FormHelperText>
        </Box>
      </Box>
    </FormControl>
  );
}
