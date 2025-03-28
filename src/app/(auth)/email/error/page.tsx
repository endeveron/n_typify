import DialogCard from '@/core/components/shared/dialog-card';
import GenerateTokenButton from '@/core/components/auth/generate-token-button';
import { emailErrors } from '@/core/data/errors';
import { getErrorMessageFromSearchParams } from '@/core/utils/error';

type TPageProps = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

const Page = async ({ searchParams }: TPageProps) => {
  const { e: email, c: errorCode } = await searchParams;
  if (!email || !errorCode) {
    throw new Error('Invalid page search params');
  }

  const errorMessage = getErrorMessageFromSearchParams(
    searchParams,
    emailErrors
  );

  return (
    <DialogCard title={`Oops! ${errorMessage}`}>
      <GenerateTokenButton email={email} />
    </DialogCard>
  );
};

export default Page;
