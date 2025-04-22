import {
  CognitiveFunctionsTranslation,
  LangCode,
  MBTIDashboardTranslation,
  MBTITestTranslation,
  MBTITypeDetailArrayTranslation,
  MBTITypeGroupsTranslation,
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

const MBTITypeLoadersMap = new Map<string, () => Promise<MBTITypesTranslation>>(
  [
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
  ]
);

const MBTITypeDetailsLoadersMap = new Map<
  string,
  () => Promise<MBTITypeDetailArrayTranslation>
>([
  [
    'en',
    () =>
      import('@/core/data/locales/en/mbti-type-details.json').then(
        (module) => module.default as MBTITypeDetailArrayTranslation
      ),
  ],
  [
    'uk',
    () =>
      import('@/core/data/locales/uk/mbti-type-details.json').then(
        (module) => module.default as MBTITypeDetailArrayTranslation
      ),
  ],
]);

const CognitiveFunctionLoadersMap = new Map<
  string,
  () => Promise<CognitiveFunctionsTranslation>
>([
  [
    'en',
    () =>
      import('@/core/data/locales/en/cognitive-functions.json').then(
        (module) => module.default as CognitiveFunctionsTranslation
      ),
  ],
  [
    'uk',
    () =>
      import('@/core/data/locales/uk/cognitive-functions.json').then(
        (module) => module.default as CognitiveFunctionsTranslation
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

const MBTITypeGroupLoadersMap = new Map<
  string,
  () => Promise<MBTITypeGroupsTranslation>
>([
  [
    'en',
    () =>
      import('@/core/data/locales/en/mbti-type-groups.json').then(
        (module) => module.default as MBTITypeGroupsTranslation
      ),
  ],
  [
    'uk',
    () =>
      import('@/core/data/locales/uk/mbti-type-groups.json').then(
        (module) => module.default as MBTITypeGroupsTranslation
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

// Utility function to save the lang code in the Local Storage
export const storeLangCode = (langCode: LangCode = 'en'): LangCode => {
  return langCode;
};

// Utility function to get all supported languages
export const getSupportedLanguages = (): LangCode[] => {
  return Object.keys(NavbarLoadersMap) as LangCode[];
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
 * Gets localized data for MBTI Types for the specified language code
 * @param langCode Language code (e.g., 'en', 'uk')
 * @returns Promise resolving to data of type MBTITypesTranslation
 * @throws Error if both requested language and fallback language fail to load
 */
export const getMBTITypesTranslation = async (
  langCode: LangCode = 'en'
): Promise<MBTITypesTranslation> => {
  // Try to get the loader for the requested language
  const loader = MBTITypeLoadersMap.get(langCode);
  const errMsg = `Failed to load translations for MBTI Types`;
  if (!loader) throw new Error(errMsg);

  try {
    return await loader();
  } catch (error) {
    // If requested language fails and it's not English, try English as fallback
    if (langCode !== 'en') {
      const fallbackLoader = MBTITypeLoadersMap.get('en');
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
 * Gets localized data for MBTI Type Details for the specified language code
 * @param langCode Language code (e.g., 'en', 'uk')
 * @returns Promise resolving to data of type MBTITypeDetailsTranslation
 * @throws Error if both requested language and fallback language fail to load
 */
export const getMBTITypeDetailsTranslation = async (
  langCode: LangCode = 'en'
): Promise<MBTITypeDetailArrayTranslation> => {
  // Try to get the loader for the requested language
  const loader = MBTITypeDetailsLoadersMap.get(langCode);
  const errMsg = `Failed to load translations for MBTI Type Details`;
  if (!loader) throw new Error(errMsg);

  try {
    return await loader();
  } catch (error) {
    // If requested language fails and it's not English, try English as fallback
    if (langCode !== 'en') {
      const fallbackLoader = MBTITypeDetailsLoadersMap.get('en');
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
 * Gets localized data for Cognitive Functions for the specified language code
 * @param langCode Language code (e.g., 'en', 'uk')
 * @returns Promise resolving to data of type CognitiveFunctionsTranslation
 * @throws Error if both requested language and fallback language fail to load
 */
export const getCognitiveFunctionsTranslation = async (
  langCode: LangCode = 'en'
): Promise<CognitiveFunctionsTranslation> => {
  // Try to get the loader for the requested language
  const loader = CognitiveFunctionLoadersMap.get(langCode);
  const errMsg = `Failed to load translations for Cognitive Functions`;
  if (!loader) throw new Error(errMsg);

  try {
    // Load the translation
    const translation = await loader();
    return translation;
  } catch (error) {
    // If requested language fails and it's not English, try English as fallback
    if (langCode !== 'en') {
      const fallbackLoader = CognitiveFunctionLoadersMap.get('en');
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
 * Gets localized data for MBTI Type Groups page for the specified language code
 * @param langCode Language code (e.g., 'en', 'uk')
 * @returns Promise resolving to data of type MBTITypeGroupsTranslation
 * @throws Error if both requested language and fallback language fail to load
 */
export const getMBTITypeGroupsTranslation = async (
  langCode: LangCode = 'en'
): Promise<MBTITypeGroupsTranslation> => {
  // Try to get the loader for the requested language
  const loader = MBTITypeGroupLoadersMap.get(langCode);
  const errMsg = `Failed to load translations for MBTI Groups`;
  if (!loader) throw new Error(errMsg);

  try {
    return await loader();
  } catch (error) {
    // If requested language fails and it's not English, try English as fallback
    if (langCode !== 'en') {
      const fallbackLoader = MBTITypeGroupLoadersMap.get('en');
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
