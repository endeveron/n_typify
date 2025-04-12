'use client';

// import { mongoDB } from '@/core/db/mongo';
// import UserModel from '@/core/models/user';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import SignInButton from '@/core/components/auth/sign-in-button';
import ToggleLanguage from '@/core/components/shared/toggle-language';
import { WelcomeTranslation } from '@/core/types/translation';
import { getWelcomeTranslation } from '@/core/utils/dictionary';
import { useLangCode } from '@/core/context/LangContext';

import WelcomeImage from '~/public/images/welcome.jpg';
import Image from 'next/image';
import { welcomeImgBlured } from '@/core/data/blured-images';

const Welcome = () => {
  // await mongoDB.connect();
  // const users = await UserModel.find();
  // console.log('users', users);
  const { langCode } = useLangCode();
  const [translation, setTranslation] = useState<WelcomeTranslation>();

  // Load translations
  useEffect(() => {
    if (!langCode) return;

    const initData = async () => {
      // Get translations
      const translations = await getWelcomeTranslation(langCode);
      if (!translations) {
        toast(`Unable to get translations`);
        return;
      }
      setTranslation(translations);
    };

    initData();
  }, [langCode]);

  return translation ? (
    <main className="relative pb-16 flex flex-col items-center">
      <div className="dev">
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
      </div>

      <div className="max-w-[400px] flex flex-col">
        <div className="w-[400px] h-[420px] bg-orange-200 rounded-br-[64px] overflow-hidden">
          <Image
            src={WelcomeImage}
            alt="welcome"
            placeholder="blur"
            blurDataURL={welcomeImgBlured}
            priority
          />
        </div>

        <div className="max-w-[400px] mx-8 flex flex-col cursor-default">
          <div className="-mt-[72px]">
            <div className="text-6xl text-background font-black leading-none">
              {translation.title.split(' ').slice(0, 1)}
            </div>
            <div className="mt-2 text-6xl text-accent font-extrabold leading-16">
              {translation.title.split(' ').slice(1).join(' ')}
            </div>
          </div>
          <div className="my-10 px-6 text-sm leading-6 text-muted font-light">
            {translation.description}
          </div>

          <div className="px-6">
            <SignInButton title={translation.signInBtnTitle} />
          </div>
        </div>
      </div>

      {/* <MBTITest langCode="uk" /> */}
      {/* <MBTIDashboard langCode="en" /> */}

      <div className="absolute bottom-6 inset-x-0 flex justify-center">
        <ToggleLanguage />
      </div>
    </main>
  ) : null;
};

export default Welcome;
