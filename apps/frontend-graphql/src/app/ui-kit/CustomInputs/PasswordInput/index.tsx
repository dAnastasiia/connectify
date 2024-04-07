import { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import {
  InputAdornment,
  IconButton,
  StandardTextFieldProps,
  TextField,
} from '@mui/material';

import { VisibilityIcon } from './ui';

interface PasswordInputProps extends StandardTextFieldProps {
  name: string;
  isPasswordsShown?: boolean;
  isIconHidden?: boolean;
  disableInnerLabel?: boolean;
}

export default function PasswordInput({
  name,
  isPasswordsShown = false,
  isIconHidden = false,
  ...props
}: PasswordInputProps) {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const { disabled } = props;

  return (
    <TextField
      {...field}
      {...props}
      type={isPasswordsShown || isPasswordShown ? 'text' : 'password'}
      InputProps={{
        endAdornment: !isIconHidden && (
          <InputAdornment position="end">
            <IconButton
              disabled={disabled}
              onClick={() => setIsPasswordShown(!isPasswordShown)}
            >
              <VisibilityIcon isPasswordShown={isPasswordShown} />
            </IconButton>
          </InputAdornment>
        ),
      }}
      error={!!error}
      helperText={error?.message}
    />
  );
}
