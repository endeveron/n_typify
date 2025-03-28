import OnboardingForm from '@/core/components/auth/onboarding-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card';
import { verifyUserObjId } from '@/core/actions/auth';

type TPageProps = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

const Page = async ({ searchParams }: TPageProps) => {
  const { t: userObjId } = await searchParams;
  if (!userObjId) throw new Error('Invalid userObjectId param.');

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
