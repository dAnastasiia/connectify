export interface PageableResponse<T> {
  data: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
}

export interface DataResponse<T> {
  message: string;
  data: T;
}

export interface CustomError {
  message: string;
  status: number;
  errors?: { [key: string]: string }[];
}

export interface ICreatePost {
  title: string;
  content: string;
  image: File;
}

export interface IUpdatePost {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  image: File | null;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
}

export interface IPost {
  _id: string;
  author: IUser;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  userId: string;
}

export interface ISignup extends ILogin {
  name: string;
}
