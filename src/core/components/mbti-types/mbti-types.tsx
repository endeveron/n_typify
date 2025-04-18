'use client';

export const MBTI_TYPES_STATE_KEY = 'mbti_types_state';

// const initialState: MBTITypesState = {
//   translation: null,
// };

// type MBTITypesProps = {};

// const MBTITypes = ({}: MBTITypesProps) => {
const MBTITypes = () => {
  // const [getState, saveState] = useLocalStorage();

  // const [state, setState] = useState<MBTIDashboardState>(initialState);

  // const handlePersonTypeCardClick = (personalityType: MBTIPersonalityType) => {
  //   console.log('personalityType', personalityType);
  // };

  // Init toolbar cards and translation
  // useEffect(() => {
  //   const initData = async () => {
  //     // Get translation
  //     const translation = await getMBTIDashboardTranslation(langCode);
  //     if (!translation) {
  //       toast(`Unable to get localized data`);
  //       return;
  //     }
  //   };

  //   initData();
  // }, [langCode]);

  // if (!state.translation) return null;

  return (
    <div className="relative max-h-[920px] base-max-w mx-auto flex flex-1 flex-col justify-between">
      <div className="top flex flex-1 flex-col max-h-[300px]"></div>

      <div className="bottom flex flex-1 flex-col">
        {/* Expanded */}
        <div className="my-4 flex flex-1 flex-col justify-center"></div>
      </div>
    </div>
  );
};

export default MBTITypes;
