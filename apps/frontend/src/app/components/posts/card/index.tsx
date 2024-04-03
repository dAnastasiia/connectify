import { useNavigate } from 'react-router-dom';

import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material';

import { IPost } from '@frontend/types';
import parseDate from '@frontend/utils/parseDate';

import { environment } from '../../../../environments/environment';

export default function Post({
  _id,
  author,
  title,
  content,
  imageUrl,
  createdAt,
}: IPost) {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(_id)}
      sx={{
        cursor: 'pointer',
        transition: 'transform 300ms, box-shadow 300ms',

        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: 'primary.main' }}>{author[0]}</Avatar>}
        title={title}
        subheader={parseDate(createdAt)}
      />
      <CardMedia
        component="img"
        sx={{
          display: 'block',
          maxHeight: 300,
          objectFit: 'contain',
        }}
        image={`${environment.API_URL}${imageUrl}`}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
}
