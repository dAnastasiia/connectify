import { useController, useFormContext } from 'react-hook-form';
import { StandardTextFieldProps, TextField } from '@mui/material';

interface FormInputProps extends StandardTextFieldProps {
  name: string;
}

export default function FormInput({ name, ...props }: FormInputProps) {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <TextField
      {...field}
      {...props}
      fullWidth
      error={!!error}
      helperText={error?.message}
    />
  );
}
