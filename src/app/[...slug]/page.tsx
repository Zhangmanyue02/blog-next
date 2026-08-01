import { notFound } from 'next/navigation';
import { Render } from '@puckeditor/core/rsc';
import { getPageBySlug } from '@/api/services/pageService';
import { getBasicConfig } from '@/configs/puck';import type { Data } from '@puckeditor/core';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function ContentPage({ params }: Props) {
  const { slug } = await params;
  const slugStr = slug.join('/');
  if (!slugStr) notFound();

  const page = await getPageBySlug(slugStr);
  if (!page) notFound();

  let data: Data | null = null;
  try {
    const parsed = JSON.parse(page.content);
    if (parsed && typeof parsed === 'object' && 'content' in parsed) {
      data = parsed as Data;
    }
  } catch {
    data = null;
  }

  if (!data) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-semibold">{page.title}</h1>
        {page.summary && <p className="mt-2 text-zinc-600">{page.summary}</p>}
        <p className="mt-8 text-zinc-500">（页面内容为空或格式异常）</p>
      </main>
    );
  }

  return (
    <main>
      <Render config={getBasicConfig()} data={data} />
    </main>
  );
}
