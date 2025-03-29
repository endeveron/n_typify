import SignInButton from '@/core/components/auth/sign-in-button';

const MainHeader = async () => {
  return (
    <div className="flex flex-row items-center justify-between p-4 bg-card">
      <div className="logo flex flex-row items-center"></div>
      <div className="toolbar flex flex-row items-center">
        <SignInButton />
      </div>
    </div>
  );
};

export default MainHeader;
