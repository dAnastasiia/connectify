export interface PageableResponse<T> {
  data: T[];
  // pageNumber: number;
  // pageSize: number;
  // totalPages: number;
  // totalCount: number;
}

export interface IPost {
  _id: string;
  author: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
}
