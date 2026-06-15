import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/api/services/pageService';
import { PuckEditor } from '@/components/PuckEditor';
import { getEmptyPuckData } from '@/configs/puck';
import type { Data } from '@puckeditor/core';

type Props = {
  params: Promise<{ path: string[] }>;
};

export default async function EditPage({ params }: Props) {
  const { path } = await params;
  const slug = path.join('/');
  if (!slug) notFound();

  const page = await getPageBySlug(slug);
  if (!page) notFound();

  let initialData: Data = getEmptyPuckData();
  try {
    const parsed = JSON.parse(page.content);
    if (parsed && typeof parsed === 'object' && 'content' in parsed) {
      initialData = parsed as Data;
    }
  } catch {
    initialData = getEmptyPuckData();
  }

  return (
    <PuckEditor
      pageId={page.id}
      initialData={initialData}
      initialTitle={page.title}
      initialSlug={page.slug}
    />
  );
}
