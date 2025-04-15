import { verifyUserObjId } from '@/core/actions/auth';
import OnboardingForm from '@/core/components/auth/onboarding-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card';
import { SearchParams } from '@/core/types/common';

const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { t } = await searchParams;
  const userObjId = t as string;

  if (!userObjId) throw new Error(`Invalid search param for user's objectId.`);

  // Check the validity of the user objectId
  await verifyUserObjId(userObjId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Onboarding</CardTitle>
        <CardDescription>Email successfully verified</CardDescription>
      </CardHeader>
      <CardContent>
        <OnboardingForm userObjId={userObjId} />
      </CardContent>
    </Card>
  );
};

export default Page;
