'use client';

// import { mongoDB } from '@/core/db/mongo';
// import UserModel from '@/core/models/user';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

// import ToggleLanguage from '@/core/components/shared/toggle-language';
import AnimatedAppear from '@/core/components/shared/animated-appear';
import { Button } from '@/core/components/ui/button';
import { DASHBOARD_STATE_KEY } from '@/core/constants';
import { useLangCode } from '@/core/context/LangContext';
import { welcomeImgBlured } from '@/core/data/blured-images';
import { useLocalStorage } from '@/core/hooks/useLocalStorage';
import { DEFAULT_REDIRECT } from '@/core/routes';
import { WelcomeTranslation } from '@/core/types/translation';
import { getWelcomeTranslation } from '@/core/utils/dictionary';
import WelcomeImage from '~/public/images/welcome.jpg';

const Welcome = () => {
  // await mongoDB.connect();
  // const users = await UserModel.find();
  // console.log('users', users);
  const { langCode } = useLangCode();
  const [getState] = useLocalStorage();

  const router = useRouter();
  const [translation, setTranslation] = useState<WelcomeTranslation>();

  const handleActionBtnClick = () => {
    router.push(DEFAULT_REDIRECT);
  };

  useEffect(() => {
    if (!langCode) return;

    // Check if the dashboard state is saved in LockalStorage
    const savedDashboardState = getState(DASHBOARD_STATE_KEY);
    if (savedDashboardState) {
      // Redirect to dashboard
      router.push(DEFAULT_REDIRECT);
      return;
    }

    const initTranslation = async () => {
      const translations = await getWelcomeTranslation(langCode);
      if (!translations) {
        toast(`Unable to get translations`);
        return;
      }
      setTranslation(translations);
    };

    initTranslation();
  }, [getState, langCode, router]);

  return translation ? (
    <AnimatedAppear
      timeout={1000}
      className="relative flex flex-1 flex-col items-center"
    >
      <main className="base-max-w flex flex-col items-center">
        <div className="w-sm h-[420px] bg-orange-200 rounded-br-[64px] overflow-hidden">
          <Image
            src={WelcomeImage}
            alt="welcome"
            placeholder="blur"
            blurDataURL={welcomeImgBlured}
            priority
          />
        </div>

        <div className="base-max-w mx-8 flex flex-col cursor-default">
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
            <Button variant="accent" size="lg" onClick={handleActionBtnClick}>
              {translation.signInBtnTitle}
            </Button>
          </div>
        </div>
      </main>
      {/* <div className="absolute bottom-6 inset-x-0 flex justify-center">
        <ToggleLanguage />
      </div> */}
    </AnimatedAppear>
  ) : null;
};

export default Welcome;
