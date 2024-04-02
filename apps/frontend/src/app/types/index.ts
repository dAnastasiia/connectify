export interface PageableResponse<T> {
  data: T[];
  // pageNumber: number;
  // pageSize: number;
  // totalPages: number;
  // totalCount: number;
}

export interface IPost {
  author: string;
  title: string;
  content: string;
  imageUrl: string;
  date: string;
}
