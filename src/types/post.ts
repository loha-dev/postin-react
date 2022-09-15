import type { clientsType } from "./account-type";
import type { socialMediaDataTypes } from "./social-type";

export type PostType = {
  created_at: Date;
  description: string;
  id: number;
  img: string | null;
  likes: number;
  shares: number;
  video: string | null;
  title: string;
};

export type fullQueryPostType = PostType & {
  page: {
    id: number;
    title: string;
    social: socialMediaDataTypes;
    owner: clientsType;
  };
};
