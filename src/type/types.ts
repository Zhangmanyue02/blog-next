export type PageStatus = 0 | 1;

export type ApplicationType = "content" | "portfolio";

export type PageNavItem = {
  id: string;
  title: string;
  slug: string;
  coverImage?: string;
  sort?: number;
  applicationId?: string | null;
  applicationCode?: string | null;
  applicationType?: ApplicationType | string | null;
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
  applicationId?: string | null;
  applicationCode?: string | null;
  applicationType?: ApplicationType | string | null;
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
