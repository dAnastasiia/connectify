import { SUPPORTED_PHOTO_FORMATS } from '@frontend/utils/constants';
import * as yup from 'yup';

const validationSchema = yup.object({
  title: yup.string().min(3, 'Too short').required('Required'),
  content: yup.string().min(2, 'Too short').required('Required'),
  image: yup
    .mixed<File>()
    .test('fileFormat', 'Unsupported format', (value, { originalValue }) =>
      SUPPORTED_PHOTO_FORMATS.includes(originalValue.type)
    )
    .required('Required'),
});

export default validationSchema;
