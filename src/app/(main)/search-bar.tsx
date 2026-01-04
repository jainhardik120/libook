'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useTRPCQuery } from '@/server/react';

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 500);
  const {
    data: searchResults = {
      books: [],
      folders: [],
    },
  } = useTRPCQuery((trpc) => trpc.book.searchBooks.queryOptions(debouncedValue));
  const router = useRouter();
  return (
    <>
      <button
        className="hover:bg-muted flex h-8 min-w-56 flex-1 cursor-pointer items-center justify-center border py-2"
        onClick={() => {
          setOpen(true);
        }}
      >
        Searchbar
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command shouldFilter={false}>
          <CommandInput placeholder="Search..." value={value} onValueChange={setValue} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Results">
              {searchResults.folders.map((folder) => {
                return (
                  <CommandItem
                    key={folder.id}
                    onSelect={() => {
                      router.push(`/library/${folder.id}`);
                      setOpen(false);
                    }}
                  >
                    {folder.name}
                  </CommandItem>
                );
              })}
              {searchResults.books.map((book) => {
                return (
                  <CommandItem
                    key={book.id}
                    onSelect={() => {
                      router.push(`/book/${book.id}`);
                      setOpen(false);
                    }}
                  >
                    {book.title}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
};

export default SearchBar;
