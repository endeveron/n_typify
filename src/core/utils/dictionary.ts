import {
  LangCode,
  MBTIDashboardTranslation,
  MBTITestTranslation,
} from '@/core/types/translation';

const MBTITestLoadersMap = new Map<string, () => Promise<MBTITestTranslation>>([
  [
    'en',
    () =>
      import('@/core/data/locales/en/mbti-test.json').then(
        (module) => module.default
      ),
  ],
  [
    'uk',
    () =>
      import('@/core/data/locales/uk/mbti-test.json').then(
        (module) => module.default
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
        (module) => module.default
      ),
  ],
  [
    'uk',
    () =>
      import('@/core/data/locales/uk/mbti-dashboard.json').then(
        (module) => module.default
      ),
  ],
]);

// Utility function to get all supported languages
export const getSupportedLanguages = (): LangCode[] => {
  return Object.keys(MBTITestLoadersMap) as LangCode[];
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

  if (!loader) {
    throw new Error(
      'Failed to load personality test translations: default language not available'
    );
  }

  try {
    // Load the translation
    const translation = await loader();
    // The imported data is already in the expected format
    return translation;
  } catch (error) {
    // If requested language fails and it's not English, try English as fallback
    if (langCode !== 'en') {
      const fallbackLoader = MBTIDashboardLoadersMap.get('en');
      if (fallbackLoader) {
        try {
          return await fallbackLoader();
        } catch (fallbackError) {
          throw new Error(
            `Failed to load personality test translations: ${fallbackError}`
          );
        }
      }
    }
    throw new Error(`Failed to load personality test translations: ${error}`);
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

  if (!loader) {
    throw new Error(
      'Failed to load personality test translations: default language not available'
    );
  }

  try {
    // Load the translation
    const translation = await loader();
    // The imported data is already in the expected format
    return translation;
  } catch (error) {
    // If requested language fails and it's not English, try English as fallback
    if (langCode !== 'en') {
      const fallbackLoader = MBTITestLoadersMap.get('en');
      if (fallbackLoader) {
        try {
          return await fallbackLoader();
        } catch (fallbackError) {
          throw new Error(
            `Failed to load personality test translations: ${fallbackError}`
          );
        }
      }
    }
    throw new Error(`Failed to load personality test translations: ${error}`);
  }
};
