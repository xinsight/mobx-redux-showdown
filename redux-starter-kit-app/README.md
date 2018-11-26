
A Redux app using <a href="https://github.com/reduxjs/redux-starter-kit">`redux-starter-kit`</a>

Key differences from redux-saga-app:

- I removed redux-saga and Immutable.js

- The fetch logic, which was previously handled by a saga, is now handled in a thunk that uses async/await.

- The Redux logic is now all written in a single file, src/features/featureSets.js, which is only 55 lines long.  (For comparison, the MobX ValueSetStore.js file is 81 lines long, although that could also be shortened.) All the previous separate Redux-related files and folders have been removed, as they're no longer necessary.

- there's no hand-written action creators or action type constants, and no spreads in any of the reducers

- The component logic was simplified

- The separate dependency on redux-devtools-extension was removed, as that is handled internally by the starter kit's configureStore() function
    I moved the store setup to a separate store.js file, but it could easily have stayed in App.js, and it's only about 5 lines anyway.

Contributed by: <a href="https://github.com/markerikson">markerikson</a>

