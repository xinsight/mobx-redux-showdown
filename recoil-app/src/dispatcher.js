import { useRecoilCallback } from 'recoil'

export const createDispatcher = () => {
    console.log("🔥")
    const logMessage = useRecoilCallback( // eslint-disable-line react-hooks/rules-of-hooks
      ({ set }) => (message) => {
        console.log(`${message}`);
        // set(logEntryListState, (logEntries) => [...logEntries, message]);
      }
    );
  return {
      logMessage
    };
  };

//   export type Dispatcher = ReturnType<typeof createDispatcher>;
