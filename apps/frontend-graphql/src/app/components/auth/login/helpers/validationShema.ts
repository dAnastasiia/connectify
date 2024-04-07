import * as yup from 'yup';

import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
} from '@frontend-graphql/utils/validation';

const validationSchema = yup.object({
  email: yup
    .string()
    .matches(EMAIL_REGEX, 'Invalid email')
    .required('Required'),

  password: yup
    .string()
    .matches(PASSWORD_REGEX, 'Invalid password')
    .required('Required'),
});

export default validationSchema;
