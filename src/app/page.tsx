// import { mongoDB } from '@/core/db/mongo';
// import UserModel from '@/core/models/user';

import SignInButton from '@/core/components/auth/sign-in-button';

// import Image from 'next/image';

export default async function Home() {
  // await mongoDB.connect();
  // const users = await UserModel.find();
  // console.log('users', users);

  return (
    <div className="p-8 font-sans">
      <main className="flex flex-col items-center">
        <h1 className="text-5xl font-medium">
          {/* <Image src="/icons/icon.svg" alt="Globe" width={24} height={24} /> */}
          H1 Inter Medium
        </h1>
        <p className="mt-8">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form
          <br />
          If you are going to use a passage of Lorem Ipsum, you need to be sure
          there isn&apos;t anything embarrassing hidden in the middle of text.
        </p>
        <SignInButton />
      </main>
    </div>
  );
}
