// import { mongoDB } from '@/core/db/mongo';
// import UserModel from '@/core/models/user';

import MainHeader from '@/core/components/shared/main-header';
import PersonalityTest from '@/core/components/test/personality-test';
// import { Button } from '@/core/components/ui/button';
// import { Button } from '@/core/components/ui/button';

// import Image from 'next/image';

export default async function Home() {
  // await mongoDB.connect();
  // const users = await UserModel.find();
  // console.log('users', users);

  return (
    <>
      <MainHeader />
      <main className="flex flex-1">
        {/* <h1 className="text-5xl font-medium my-8">
          <Image src="/icons/icon.svg" alt="Globe" width={24} height={24} />
          Inter Medium
        </h1>
        <p>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form
          <br />
          If you are going to use a passage of Lorem Ipsum, you need to be sure
          there isn&apos;t anything embarrassing hidden in the middle of text.
        </p>
        <div className="flex gap-4 mt-8">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div> */}

        <PersonalityTest langCode="uk" />
      </main>
    </>
  );
}
