import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold">404</h1>
      <p className="mt-2 text-zinc-600">页面不存在或未发布</p>
      <Link
        href="/"
        className="mt-4 inline-block text-blue-600 hover:underline"
      >
        返回首页
      </Link>
    </main>
  );
}
