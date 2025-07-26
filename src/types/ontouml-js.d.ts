// src/types/ontouml-js.d.ts

declare module 'ontouml-js' {
  export class Project {
    static from(json: any): Project;
    name?: string;
    // adicione mais se necessário
  }
}
