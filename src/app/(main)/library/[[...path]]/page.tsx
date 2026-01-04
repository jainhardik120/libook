import Link from 'next/link';

import { BookIcon, FolderIcon } from 'lucide-react';

import { fetchQuery } from '@/server/server';

import BookUploadForm from './book-upload-form';
import CreateFolderForm from './create-folder-form';

export default async function Page({ params }: PageProps<'/library/[[...path]]'>) {
  const { path } = await params;
  const folder = path === undefined || path.length === 0 ? '' : path[path.length - 1];
  const folderData = await fetchQuery((trpc) => trpc.book.getFolders.queryOptions(folder));
  const bookData = await fetchQuery((trpc) => trpc.book.getBooks.queryOptions(folder));
  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex w-full justify-end gap-2">
        <BookUploadForm parentFolder={folder} />
        <CreateFolderForm parentFolder={folder} />
      </div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10">
        {folderData.map((folder) => {
          return (
            <Link
              key={folder.id}
              className="bg-primary/25 border-primary flex aspect-square flex-col items-center justify-center gap-2 border p-2 text-center"
              href={`/library/${folder.id}`}
            >
              <FolderIcon className="text-primary size-16" />
              <p>{folder.name}</p>
            </Link>
          );
        })}
        {bookData.map((book) => {
          return (
            <Link
              key={book.id}
              className="bg-primary/25 border-primary flex aspect-square flex-col items-center justify-center gap-2 border p-2 text-center"
              href={`/book/${book.id}`}
            >
              <BookIcon className="text-primary size-16" />
              <p>{book.title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
