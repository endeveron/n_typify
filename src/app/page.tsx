// import { mongoDB } from '@/core/db/mongo';
// import UserModel from '@/core/models/user';

import MainHeader from '@/core/components/shared/main-header';
import PersonalityTest from '@/core/components/personality-test/personality-test';
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
        {/* <div className="flex gap-4 mt-8">
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
