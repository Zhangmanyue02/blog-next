'use client';

import { useState } from 'react';
import { Puck, type Data } from '@puckeditor/core';
import '@puckeditor/core/puck.css';
import { getAdvancedConfig } from '@/configs/puck';
import { updatePageById } from '@/api/services/pageService';
import type { PageFormDto } from '@/type/types';

type Props = {
  pageId: string;
  initialData: Data;
  initialTitle: string;
  initialSlug: string;
};

export function PuckEditor({ pageId, initialData, initialTitle, initialSlug }: Props) {
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="h-screen w-screen">
      {savedAt && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 rounded bg-emerald-600 px-3 py-1 text-sm text-white">
          已保存于 {savedAt.toLocaleTimeString()}
        </div>
      )}
      {error && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 rounded bg-red-600 px-3 py-1 text-sm text-white">
          保存失败：{error}
        </div>
      )}
      <Puck
        config={getAdvancedConfig()}
        data={initialData}
        onPublish={async (data) => {
          setSaving(true);
          setError(null);
          try {
            const dto: PageFormDto = {
              title: initialTitle,
              slug: initialSlug,
              content: JSON.stringify(data),
            };
            await updatePageById(pageId, dto);
            setSavedAt(new Date());
          } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
          } finally {
            setSaving(false);
          }
        }}
      />
      {saving && (
        <div className="fixed bottom-3 right-3 z-50 rounded bg-zinc-800 px-3 py-1 text-sm text-white">
          保存中…
        </div>
      )}
    </div>
  );
}
