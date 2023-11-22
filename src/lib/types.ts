export interface Json {
  [x: string]: string | number | boolean | Date | Json | JsonArray;
}
export interface JsonArray
  extends Array<string | number | boolean | Date | Json | JsonArray> {}

export interface $InsertPost {
  userId: string;
  title: string;
  content: Json;
  published?: boolean;
}

export interface $UpdatePost extends $InsertPost {
  id: string;
}
