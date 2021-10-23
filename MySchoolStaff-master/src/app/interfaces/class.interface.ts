export interface Class {
  id: number;
  name: string;
}

export interface ClassGrade {
  class: Class;
  grade: number;
}

export interface ClassResponse {
  id: number;
  name: string;
  subject: string;
  teacher: string;
  students?: string[],
}
