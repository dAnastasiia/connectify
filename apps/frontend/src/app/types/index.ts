export interface PageableResponse<T> {
  data: T[];
  // pageNumber: number;
  // pageSize: number;
  // totalPages: number;
  // totalCount: number;
}

export interface DataResponse<T> {
  message: string;
  data: T;
}

export interface CustomError {
  message: string;
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

export interface IPost {
  _id: string;
  author: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}
