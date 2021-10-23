export interface Credential {
  studentId: string;
  password: string;
}

export interface JWTToken {
  refresh: string;
  access: string;
}
