import { Button, ButtonProps, CircularProgress } from '@mui/material';

interface LoadingButtonProps extends ButtonProps {
  label: string;
  loading?: boolean;
}

export default function LoadingButton({
  label,
  loading,
  disabled,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      {...props}
      type="submit"
      disabled={disabled || loading}
      startIcon={loading && <CircularProgress size={16} color="inherit" />}
    >
      {label}
    </Button>
  );
}
