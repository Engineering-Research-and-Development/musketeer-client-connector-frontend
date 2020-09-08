export interface Connection {
    name: string;
    host: string;
    port: number;
    type: string;
    database?: string;
    table?: string;
  
    user?: string;
    password?: string;
  }