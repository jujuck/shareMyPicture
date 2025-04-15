export type ImageType = {
  name: string;
  description: string;
  tags: string;
  url: string;
  id: string;
  seen: boolean;
  created_at?: Date;
  orientation?: string;
};

export const initialImage: ImageType = {
  id: "",
  name: "",
  description: "",
  tags: "",
  seen: false,
  url: "",
};
