import SignUpForm from '@/core/components/auth/signup-form';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card';

const Page = async () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        {/* <div className="flex flex-col">
          <div className="mb-2 text-center text-sm text-secondary-foreground">
            Unable to register in the preview mode
          </div>
          <Link href="/sign-in" className="auth-form_link">
            Log in
          </Link>
        </div> */}
        <SignUpForm />
      </CardContent>
    </Card>
  );
};

export default Page;
