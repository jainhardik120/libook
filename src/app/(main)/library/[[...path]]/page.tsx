import { fetchQuery } from '@/server/server';

import BookUploadForm from './book-upload-form';
import CreateFolderForm from './create-folder-form';

export default async function Page({ params }: PageProps<'/library/[[...path]]'>) {
  const { path } = await params;
  const folder = path === undefined || path.length === 0 ? '' : path[path.length - 1];
  const folderData = await fetchQuery((trpc) => trpc.book.getFolders.queryOptions(folder));
  const bookData = await fetchQuery((trpc) => trpc.book.getBooks.queryOptions(folder));
  return (
    <div>
      {JSON.stringify(path)}
      {JSON.stringify(folderData)}
      {JSON.stringify(bookData)}
      <BookUploadForm parentFolder={folder} />
      <CreateFolderForm parentFolder={folder} />
    </div>
  );
}
