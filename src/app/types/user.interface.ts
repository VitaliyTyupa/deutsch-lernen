export interface User {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  token?: string;
}
export enum UserRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
}
