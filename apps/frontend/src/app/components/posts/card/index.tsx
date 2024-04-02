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

export default function Post({
  author,
  title,
  content,
  imageUrl,
  createdAt,
}: IPost) {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar>{author[0]}</Avatar>}
        title={title}
        subheader={parseDate(createdAt)}
      />
      <CardMedia component="img" height={194} image={imageUrl} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
}
