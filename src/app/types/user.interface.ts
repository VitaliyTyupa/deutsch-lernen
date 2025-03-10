export interface User {
  id: string;
  email: string;
  name: string;
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
