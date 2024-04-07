import * as yup from 'yup';

import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
} from '@frontend-graphql/utils/validation';

const validationSchema = yup.object({
  name: yup.string().min(5, 'Too short').required('Required'),
  email: yup
    .string()
    .matches(EMAIL_REGEX, 'Invalid email')
    .required('Required'),

  password: yup
    .string()
    .matches(PASSWORD_REGEX, 'Invalid password')
    .required('Required'),

  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], "Passwords don't match")
    .required('Required'),
});

export default validationSchema;
