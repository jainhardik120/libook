'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { useTRPCMutation } from '@/server/react';

const CreateBookButton = () => {
  const router = useRouter();
  const mutation = useTRPCMutation((trpc) => trpc.createNewBook.mutationOptions());
  return (
    <Button
      onClick={async () => {
        await mutation.mutateAsync();
        router.refresh();
      }}
    >
      Create Book
    </Button>
  );
};

export default CreateBookButton;
