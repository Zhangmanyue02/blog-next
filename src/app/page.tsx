import { redirect } from 'next/navigation';
import { getNavList } from '@/api/services/pageService';

export default async function HomePage() {
  const items = (await getNavList()) ?? [];
  const first = [...items].sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))[0];
  if (first) {
    redirect(`/${first.slug}`);
  }
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold">站点页面</h1>
      <p className="mt-8 text-zinc-500">暂无已发布页面</p>
    </main>
  );
}
