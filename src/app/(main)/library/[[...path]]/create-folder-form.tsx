'use client';

import MutationModal from '@/components/mutation-modal';
import { Button } from '@/components/ui/button';
import { useTRPCMutation } from '@/server/react';
import { createFolderSchema } from '@/types';

const CreateFolderForm = ({ parentFolder }: { parentFolder: string }) => {
  const mutation = useTRPCMutation((trpc) => trpc.book.createFolder.mutationOptions());
  return (
    <MutationModal
      button={<Button>Create Folder</Button>}
      defaultValues={{
        name: '',
      }}
      fields={[
        {
          name: 'name',
          label: 'Name',
          type: 'input',
        },
      ]}
      mutation={{
        ...mutation,
        mutateAsync: (values) => mutation.mutateAsync({ schema: values, parentFolder }),
      }}
      schema={createFolderSchema}
      submitButtonText="Create"
      successToast={() => {
        return `Folder created successfully`;
      }}
    />
  );
};

export default CreateFolderForm;
