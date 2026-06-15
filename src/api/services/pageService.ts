import { apiClient } from '../apiClient';
import type { PageDetail, PageNavItem, PageFormDto } from '@/type/types';

export function getNavList(): Promise<PageNavItem[] | null> {
  return apiClient
    .get<PageNavItem[]>('/api/v1/pages/nav')
    .then((res) => res.data as PageNavItem[] | null);
}

export function getPageBySlug(slug: string): Promise<PageDetail | null> {
  const path = `/api/v1/pages/slug/${slug.split('/').map(encodeURIComponent).join('/')}`;
  return apiClient
    .get<PageDetail>(path)
    .then((res) => res.data as PageDetail | null);
}

export function getPageById(id: string): Promise<PageDetail | null> {
  return apiClient
    .get<PageDetail>(`/api/v1/pages/${id}`)
    .then((res) => res.data as PageDetail | null);
}

export function updatePageById(id: string, dto: PageFormDto): Promise<PageDetail | null> {
  return apiClient
    .put<PageDetail>(`/api/v1/pages/${id}`, dto)
    .then((res) => res.data as PageDetail | null);
}
