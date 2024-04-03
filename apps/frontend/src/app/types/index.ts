export interface PageableResponse<T> {
  data: T[];
  // pageNumber: number;
  // pageSize: number;
  // totalPages: number;
  // totalCount: number;
}

export interface PostResponse<T> {
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
}

export interface IPost extends ICreatePost {
  _id: string;
  author: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}
