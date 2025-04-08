// import { mongoDB } from '@/core/db/mongo';
// import UserModel from '@/core/models/user';

import MainHeader from '@/core/components/shared/main-header';
import PersonalityTest from '@/core/components/personality-test/personality-test';
// import { Button } from '@/core/components/ui/button';

export default async function Home() {
  // await mongoDB.connect();
  // const users = await UserModel.find();
  // console.log('users', users);

  return (
    <>
      <MainHeader />
      <main className="flex flex-1">
        {/* <div className="flex gap-4 mt-8">
          <Button size="sm">Default</Button>
          <Button size="sm" variant="secondary">
            Secondary
          </Button>
          <Button size="sm" variant="outline">
            Outline
          </Button>
          <Button size="sm" variant="ghost">
            Ghost
          </Button>
          <Button size="sm" variant="link">
            Link
          </Button>
        </div>

        <div className="flex gap-4 mt-8">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>

        <div className="flex gap-4 mt-8">
          <Button size="lg">Default</Button>
          <Button size="lg" variant="secondary">
            Secondary
          </Button>
          <Button size="lg" variant="outline">
            Outline
          </Button>
          <Button size="lg" variant="ghost">
            Ghost
          </Button>
          <Button size="lg" variant="link">
            Link
          </Button>
        </div> */}

        <PersonalityTest langCode="uk" />
      </main>
    </>
  );
}
