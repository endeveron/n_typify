import GenerateTokenButton from '@/core/components/auth/generate-token-button';
import DialogCard from '@/core/components/shared/dialog-card';
import { SearchParams } from '@/core/types/common';

const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { e } = await searchParams;
  const email = e as string;

  if (!email) {
    throw new Error('Invalid search param for email');
  }

  return (
    <DialogCard title="Great, now verify email">
      <p>
        Check your inbox at <strong>{email}</strong> and click the verification
        link inside to complete your registration.
      </p>
      <p className="my-2">
        <strong>Don&apos;t see an email?</strong> Check spam folder.
      </p>
      <GenerateTokenButton
        email={email}
        className="mt-4"
        btnTitle="Send a new email"
        variant="outline"
      />
    </DialogCard>
  );
};

export default Page;
