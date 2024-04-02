import * as yup from 'yup';

const validationSchema = yup.object({
  title: yup.string().min(3, 'Too short').required('Required'),
  content: yup.string().min(2, 'Too short').required('Required'),
});

export default validationSchema;
