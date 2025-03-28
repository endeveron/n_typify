import SignOutButton from '@/core/components/auth/sign-out-btn';

export default async function Dashboard() {
  return (
    <div className="p-8">
      <div className="text-3xl font-medium mb-4">Protected</div>
      <SignOutButton />
    </div>
  );
}
