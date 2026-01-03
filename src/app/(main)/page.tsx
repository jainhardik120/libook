import { fetchQuery } from '@/server/server';

import CreateBookButton from '../create-book-button';

export default async function Page() {
  const books = await fetchQuery((trpc) => trpc.getAllBooks.queryOptions());
  return (
    <div>
      <pre>{JSON.stringify(books, null, 2)}</pre>
      <CreateBookButton />
    </div>
  );
}
