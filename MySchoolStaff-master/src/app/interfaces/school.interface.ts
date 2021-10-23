export interface School {
  id: string;
  name: string;
  active: boolean;
  address?: string;
}

export interface Profile {
  image: string;
  name: string;
}

export interface UserResponse {
  id: number;
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface StaffResponse {
  id: number;
  user: UserResponse;
  school: string;
  image?: string;
  classes: string[];
}

export interface StaffRequest {
  id: number;
  image: File;
}

export interface UserPointsResponse {
  id: number;
  user: UserResponse;
  totalPoints: number;
}

export interface ChangePasswordRequest {
  old_password: string;
  password: string;
}
