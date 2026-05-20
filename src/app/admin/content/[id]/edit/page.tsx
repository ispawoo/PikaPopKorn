'use client';

import { use } from 'react';
import AddContentPage from '../../new/page';

interface EditContentProps {
  params: Promise<{ id: string }>;
}

export default function EditContentPage({ params }: EditContentProps) {
  // In a real app, we would fetch the data for `id` and pass it to the form
  // For now, we'll reuse the AddContentPage which has the layout
  const { id } = use(params);
  
  return (
    <>
      <div className="mb-4 text-sm text-zinc-500">Editing Content ID: {id}</div>
      <AddContentPage />
    </>
  );
}
