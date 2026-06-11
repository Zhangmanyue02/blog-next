import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/api/services/pageService';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function ContentPage({ params }: Props) {
  const { slug } = await params;
  const slugStr = slug.join('/');
  if (!slugStr) notFound();

  const page = await getPageBySlug(slugStr);
  if (!page) notFound();

  let parsed: unknown = null;
  try {
    parsed = JSON.parse(page.content);
  } catch {
    parsed = null;
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold">{page.title}</h1>
      {page.summary && (
        <p className="mt-2 text-zinc-600">{page.summary}</p>
      )}
      <article className="mt-8">
        {parsed ? (
          <pre className="overflow-auto rounded bg-zinc-50 p-4 text-sm">
            {JSON.stringify(parsed, null, 2)}
          </pre>
        ) : (
          <p className="text-zinc-500">（无内容或内容格式异常）</p>
        )}
      </article>
    </main>
  );
}
