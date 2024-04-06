import { useNavigate } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';

export default function GoBackButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant="text"
      onClick={() => navigate(-1)}
      startIcon={<ArrowBackIcon />}
    >
      Go Back
    </Button>
  );
}
