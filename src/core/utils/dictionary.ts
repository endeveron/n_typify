import {
  LangCode,
  MBTIDashboardTranslation,
  MBTITestTranslation,
  MBTITypesTranslation,
  NavbarTranslation,
  WelcomeTranslation,
} from '@/core/types/translation';

const NavbarLoadersMap = new Map<string, () => Promise<NavbarTranslation>>([
  [
    'en',
    () =>
      import('@/core/data/locales/en/navbar.json').then(
        (module) => module.default as NavbarTranslation
      ),
  ],
  [
    'uk',
    () =>
      import('@/core/data/locales/uk/navbar.json').then(
        (module) => module.default as NavbarTranslation
      ),
  ],
]);

const WelcomeLoadersMap = new Map<string, () => Promise<WelcomeTranslation>>([
  [
    'en',
    () =>
      import('@/core/data/locales/en/welcome.json').then(
        (module) => module.default as WelcomeTranslation
      ),
  ],
  [
    'uk',
    () =>
      import('@/core/data/locales/uk/welcome.json').then(
        (module) => module.default as WelcomeTranslation
      ),
  ],
]);

const MBTITestLoadersMap = new Map<string, () => Promise<MBTITestTranslation>>([
  [
    'en',
    () =>
      import('@/core/data/locales/en/mbti-test.json').then(
        (module) => module.default as MBTITestTranslation
      ),
  ],
  [
    'uk',
    () =>
      import('@/core/data/locales/uk/mbti-test.json').then(
        (module) => module.default as MBTITestTranslation
      ),
  ],
]);

const MBTIDashboardLoadersMap = new Map<
  string,
  () => Promise<MBTIDashboardTranslation>
>([
  [
    'en',
    () =>
      import('@/core/data/locales/en/mbti-dashboard.json').then(
        (module) => module.default as MBTIDashboardTranslation
      ),
  ],
  [
    'uk',
    () =>
      import('@/core/data/locales/uk/mbti-dashboard.json').then(
        (module) => module.default as MBTIDashboardTranslation
      ),
  ],
]);

const MBTITypesLoadersMap = new Map<
  string,
  () => Promise<MBTITypesTranslation>
>([
  [
    'en',
    () =>
      import('@/core/data/locales/en/mbti-types.json').then(
        (module) => module.default as MBTITypesTranslation
      ),
  ],
  [
    'uk',
    () =>
      import('@/core/data/locales/uk/mbti-types.json').then(
        (module) => module.default as MBTITypesTranslation
      ),
  ],
]);

// Utility function to save the lang code in the Local Storage
export const storeLangCode = (langCode: LangCode = 'en'): LangCode => {
  return langCode;
};

// Utility function to get all supported languages
export const getSupportedLanguages = (): LangCode[] => {
  return Object.keys(MBTITestLoadersMap) as LangCode[];
};

/**
 * Gets localized data for Navbar for the specified language code
 * @param langCode Language code (e.g., 'en', 'uk')
 * @returns Promise resolving to data of type NavbarTranslation
 * @throws Error if both requested language and fallback language fail to load
 */
export const getNavbarTranslation = async (
  langCode: LangCode = 'en'
): Promise<NavbarTranslation> => {
  // Try to get the loader for the requested language
  const loader = NavbarLoadersMap.get(langCode);
  const errMsg = `Failed to load translations for Navbar`;
  if (!loader) throw new Error(errMsg);

  try {
    // Load the translation
    const translation = await loader();
    return translation;
  } catch (error) {
    // If requested language fails and it's not English, try English as fallback
    if (langCode !== 'en') {
      const fallbackLoader = NavbarLoadersMap.get('en');
      if (fallbackLoader) {
        try {
          return await fallbackLoader();
        } catch (fallbackError) {
          throw new Error(`${errMsg}: ${fallbackError}`);
        }
      }
    }
    throw new Error(`${errMsg}: ${error}`);
  }
};

/**
 * Gets localized data for Welcome page for the specified language code
 * @param langCode Language code (e.g., 'en', 'uk')
 * @returns Promise resolving to data of type WelcomeTranslation
 * @throws Error if both requested language and fallback language fail to load
 */
export const getWelcomeTranslation = async (
  langCode: LangCode = 'en'
): Promise<WelcomeTranslation> => {
  // Try to get the loader for the requested language
  const loader = WelcomeLoadersMap.get(langCode);
  const errMsg = `Failed to load translations for the Welcome page`;
  if (!loader) throw new Error(errMsg);

  try {
    // Load the translation
    const translation = await loader();
    return translation;
  } catch (error) {
    // If requested language fails and it's not English, try English as fallback
    if (langCode !== 'en') {
      const fallbackLoader = WelcomeLoadersMap.get('en');
      if (fallbackLoader) {
        try {
          return await fallbackLoader();
        } catch (fallbackError) {
          throw new Error(`${errMsg}: ${fallbackError}`);
        }
      }
    }
    throw new Error(`${errMsg}: ${error}`);
  }
};

/**
 * Gets localized data for MBTI Dashboard for the specified language code
 * @param langCode Language code (e.g., 'en', 'uk')
 * @returns Promise resolving to data of type MBTIDashboardTranslation
 * @throws Error if both requested language and fallback language fail to load
 */
export const getMBTIDashboardTranslation = async (
  langCode: LangCode = 'en'
): Promise<MBTIDashboardTranslation> => {
  // Try to get the loader for the requested language
  const loader = MBTIDashboardLoadersMap.get(langCode);
  const errMsg = `Failed to load translations for the Dashboard page`;
  if (!loader) throw new Error(errMsg);

  try {
    // Load the translation
    const translation = await loader();
    return translation;
  } catch (error) {
    // If requested language fails and it's not English, try English as fallback
    if (langCode !== 'en') {
      const fallbackLoader = MBTIDashboardLoadersMap.get('en');
      if (fallbackLoader) {
        try {
          return await fallbackLoader();
        } catch (fallbackError) {
          throw new Error(`${errMsg}: ${fallbackError}`);
        }
      }
    }
    throw new Error(`${errMsg}: ${error}`);
  }
};

/**
 * Gets localized data for Welcome page for the specified language code
 * @param langCode Language code (e.g., 'en', 'uk')
 * @returns Promise resolving to data of type WelcomeTranslation
 * @throws Error if both requested language and fallback language fail to load
 */
export const getMBTITypesTranslation = async (
  langCode: LangCode = 'en'
): Promise<MBTITypesTranslation> => {
  // Try to get the loader for the requested language
  const loader = MBTITypesLoadersMap.get(langCode);
  const errMsg = `Failed to load translations for MBTI Types`;
  if (!loader) throw new Error(errMsg);

  try {
    return await loader();
  } catch (error) {
    // If requested language fails and it's not English, try English as fallback
    if (langCode !== 'en') {
      const fallbackLoader = MBTITypesLoadersMap.get('en');
      if (fallbackLoader) {
        try {
          return await fallbackLoader();
        } catch (fallbackError) {
          throw new Error(`${errMsg}: ${fallbackError}`);
        }
      }
    }
    throw new Error(`${errMsg}: ${error}`);
  }
};

/**
 * Gets localized data for MBTI Test for the specified language code
 * @param langCode Language code (e.g., 'en', 'uk')
 * @returns Promise resolving to data of type MBTITestTranslation
 * @throws Error if both requested language and fallback language fail to load
 */
export const getMBTITestTranslation = async (
  langCode: LangCode = 'en'
): Promise<MBTITestTranslation> => {
  // Try to get the loader for the requested language
  const loader = MBTITestLoadersMap.get(langCode);
  const errMsg = `Failed to load translations for the Personality Test page`;
  if (!loader) throw new Error(errMsg);

  try {
    // Load the translation
    const translation = await loader();
    return translation;
  } catch (error) {
    // If requested language fails and it's not English, try English as fallback
    if (langCode !== 'en') {
      const fallbackLoader = MBTITestLoadersMap.get('en');
      if (fallbackLoader) {
        try {
          return await fallbackLoader();
        } catch (fallbackError) {
          throw new Error(`${errMsg}: ${fallbackError}`);
        }
      }
    }
    throw new Error(`${errMsg}: ${error}`);
  }
};
