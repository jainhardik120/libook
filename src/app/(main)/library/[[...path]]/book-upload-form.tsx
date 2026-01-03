'use client';

import MutationModal from '@/components/mutation-modal';
import { Button } from '@/components/ui/button';
import { useTRPCMutation } from '@/server/react';
import { createBookSchema } from '@/types';

const BookUploadForm = ({ parentFolder }: { parentFolder: string }) => {
  const mutation = useTRPCMutation((trpc) => trpc.book.createBook.mutationOptions());
  return (
    <MutationModal
      button={<Button>Upload Book</Button>}
      defaultValues={{
        title: '',
        thumbnailImageS3Path: '',
        pdfFileS3Path: '',
      }}
      fields={[
        {
          name: 'title',
          label: 'Title',
          type: 'input',
        },
        {
          name: 'thumbnailImageS3Path',
          label: 'Thumbnail Image S3 Path',
          type: 'input',
        },
        {
          name: 'pdfFileS3Path',
          label: 'PDF File S3 Path',
          type: 'input',
        },
      ]}
      mutation={{
        ...mutation,
        mutateAsync: (values) => mutation.mutateAsync({ schema: values, parentFolder }),
      }}
      schema={createBookSchema}
      submitButtonText="Upload"
      successToast={() => {
        return `Book created successfully`;
      }}
    />
  );
};

export default BookUploadForm;
