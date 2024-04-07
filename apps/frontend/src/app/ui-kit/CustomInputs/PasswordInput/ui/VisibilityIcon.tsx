import {
  Visibility as VisibilityOnIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';

interface VisibilityIconProps {
  isPasswordShown: boolean;
}

export default function VisibilityIcon({
  isPasswordShown,
}: VisibilityIconProps) {
  return isPasswordShown ? (
    <VisibilityOffIcon fontSize="small" />
  ) : (
    <VisibilityOnIcon fontSize="small" />
  );
}
