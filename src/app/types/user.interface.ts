export interface User {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  access_token: string;
}
export enum UserRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
}

export interface UserCredentials {
  email: string;
  password: string;
}
