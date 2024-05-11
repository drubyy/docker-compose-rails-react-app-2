export interface IMemberRes {
  id: string;
  attributes: IMemberAttribute;
  type: string;
}

export interface IMemberAttribute {
  id: number;
  email: string; 
}
