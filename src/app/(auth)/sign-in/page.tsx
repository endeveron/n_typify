import SignInForm from '@/core/components/auth/signin-form';
import AnimatedAppear from '@/core/components/shared/animated-appear';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card';

const Page = async () => {
  return (
    <AnimatedAppear>
      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
    </AnimatedAppear>
  );
};

export default Page;
