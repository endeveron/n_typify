import {
  LangCode,
  PersonalityTestTranslation,
} from '@/core/types/personality-test';

const personalityTestLoadersMap = new Map<
  string,
  () => Promise<PersonalityTestTranslation>
>([
  [
    'en',
    () =>
      import('@/core/data/locales/en/personality-test.json').then(
        (module) => module.default
      ),
  ],
  [
    'uk',
    () =>
      import('@/core/data/locales/uk/personality-test.json').then(
        (module) => module.default
      ),
  ],
]);

// Utility function to get all supported languages
export const getSupportedLanguages = (): LangCode[] => {
  return Object.keys(personalityTestLoadersMap) as LangCode[];
};

/**
 * Gets localized data for QuestionCard for the specified language code
 * @param langCode Language code (e.g., 'en', 'uk')
 * @returns Promise resolving to data of type LocalizedQuestionCard
 * @throws Error if both requested language and fallback language fail to load
 */
export const getPersonalityTestTranslation = async (
  langCode: LangCode
): Promise<PersonalityTestTranslation> => {
  // Try to get the loader for the requested language
  const loader =
    personalityTestLoadersMap.get(langCode) ||
    personalityTestLoadersMap.get('en');

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
      const fallbackLoader = personalityTestLoadersMap.get('en');
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
