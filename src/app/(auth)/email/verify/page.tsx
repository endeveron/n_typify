import DialogCard from '@/core/components/shared/dialog-card';
import GenerateTokenButton from '@/core/components/auth/generate-token-button';

type TPageProps = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

const Page = async ({ searchParams }: TPageProps) => {
  const { e: email } = await searchParams;
  if (!email) {
    throw new Error('Invalid page search param');
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
