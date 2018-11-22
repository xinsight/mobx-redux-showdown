
Compare mobx and redux

I've been using redux for a project, and honestly, I don't like it. I decided to write a simple app in redux and then another in mobx to compare the approaches to state management.

The app loads a network resource, and displays it. Pretty simple stuff.

This repo contains both pprojets.

[some base stats?]

## Number of Files

Redux 10
MobX 6

Readux is clearly more "spread out". Why does redux have 4 more files? That's because of redux's requirement to split things into actions, reducers, selectors, and sagas (for handling the network request).

Redux
redux-app/src/redux/actions/actions.js
redux-app/src/redux/reducers/reducers.js
redux-app/src/redux/reducers/valueSetsReducer.js
redux-app/src/redux/sagas/sagas.js
redux-app/src/redux/selectors/valueSetSelectors.js

MobX
mobx-app/src/ValueSetStore.js

(I could have done the network request with thunks, but it still would involve an additional file.)

It's an interesting academic exercise to split functionality apart and sort the bits into files. But it also means that you have to visit all 4 files in order to do anything. In MobX, you have a single place, where you can put all related functions (actions), getters (selectors), setters (reducers) and promises (sagas). Is it messy to have all those in one place? I don't think so. It seems completely clear and sane.

## Boilerplate

Let's look at how you setup a store. Something you only have to do once, but still, something important.

Redux
```
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './redux/reducers/reducers'
import rootSaga from './redux/sagas/sagas'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer, // 0: reducer
  composeWithDevTools(
    applyMiddleware(sagaMiddleware), // 1: middleware
  )
)

sagaMiddleware.run(rootSaga)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        ...
      </Provider>
    )
  }
}
```

MobX
import { Provider } from 'mobx-react'
import ValueSetStore from './ValueSetStore'

const valueSetStore = new ValueSetStore()

class App extends Component {
  render() {
    return (
      <Provider ValueSetStore={valueSetStore}>
        ...
      </Provider>
    )
  }
}

redux requires much more hand-holding - mainly because redux insists on not handling asynchronous functions internally, you so need to use a separate library (redux-thunk or redux-saga).



## Debugging

I added the redux dev tools, because that seems to be a popular too. In practice, I found that it's incredibly noisy, and analagous to digging through console.log output.

It also doesn't work when you pause on a breakpoint, and only works when everything is wired up correctly. So mostly, it's just a way to help identify which part of the code is failing. (For example: "The correct action is being dispatched, but somehow the reducer is not updating the state." So then you have to go back to your debugger to debug that action. With MobX, you just drop a breakpoint in your store, and then inspect variables when you hit the breakpoint, or step through the code.




















