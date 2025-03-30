export type LoginType = {
  email: string;
  password: string;
};
export type SignupType = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
};
export type PostType = {
  postText: string;
  postUsername: string;
  postUserFirstName: string;
  hrDiff: string;
  imageUrl?: string;
};
