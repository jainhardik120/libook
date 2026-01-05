import dynamic from 'next/dynamic';

import { fetchQuery } from '@/server/server';

const PDFReader = dynamic(() => import('./pdf-reader'));
export default async function BookPage({ params }: PageProps<'/book/[id]'>) {
  const { id } = await params;
  const data = await fetchQuery((trpc) => trpc.book.getBookData.queryOptions(id));
  return <PDFReader pdfFileUrl={data.presignedUrl} />;
}
