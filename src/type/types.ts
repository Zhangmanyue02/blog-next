export type PageStatus = 0 | 1;

export type PageNavItem = {
  id: string;
  title: string;
  slug: string;
  coverImage?: string;
  sort?: number;
};

export type PageDetail = {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  coverImage?: string;
  content: string;
  templateCode?: string;
  sort?: number;
  status: PageStatus;
};

export type PageFormDto = {
  title: string;
  slug: string;
  summary?: string;
  coverImage?: string;
  content: string;
  templateCode?: string;
  sort?: number;
};
