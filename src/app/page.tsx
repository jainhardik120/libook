import { ThemeToggle } from '@/components/theme-toggle';
import { fetchQuery } from '@/server/server';

import CreateBookButton from './create-book-button';

export default async function Page() {
  const books = await fetchQuery((trpc) => trpc.getAllBooks.queryOptions());
  return (
    <div>
      Hello World
      <ThemeToggle />
      {JSON.stringify(books)}
      <CreateBookButton />
    </div>
  );
}
