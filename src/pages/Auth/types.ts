export interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: UserRole;
  createdAt: string;
}

export type UserRole = 'admin' | 'analyst' | 'viewer';

export interface AuthTokenPayload {
  token: string;
  user: User;
}
