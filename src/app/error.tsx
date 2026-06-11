'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold">出错了</h1>
      <p className="mt-2 text-zinc-600">后端请求失败，请稍后重试</p>
      <div className="mt-4 flex gap-4">
        <button
          onClick={() => unstable_retry()}
          className="text-blue-600 hover:underline"
        >
          重试
        </button>
        <Link href="/" className="text-blue-600 hover:underline">
          返回首页
        </Link>
      </div>
    </main>
  );
}
