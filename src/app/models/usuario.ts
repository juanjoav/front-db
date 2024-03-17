import { Roles } from "./roles";

export interface Usuario{
    id?: number;//
    name: string;//
    lastName: string;//
    password: string;//
    username: string;//
    image: string;//
    birthDate?: string;
    roles?: Roles[];
  }