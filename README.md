
# Redux and Mobx showdown

I've been using Redux for a project, and honestly, **I don't like it**. I decided to write a simple app in Redux and then write it again in MobX to compare the two approaches to state management.

The app loads a network resource, and displays it. Pretty simple stuff. To make this a bit more realistic, I also wanted to handle:

- loading states
- errors
- duplicate network requests (only one request should happen)

## Update
2018-11-26: I received a total rewrite of the redux app by <a href="https://github.com/markerikson">markerikson</a> using `redux-starter-kit`, and I've added it to the shootout. I'll need to update my comments below since it addresses *many* of the pain points with Redux.

There are now three apps in the repo:

- <a href="https://github.com/xinsight/mobx-redux-showdown/tree/master/mobx-app">mobx-app</a>: MobX
- <a href="https://github.com/xinsight/mobx-redux-showdown/tree/master/redux-app">redux-app</a>: Immutable.js, sagas, hand-written action creators
- <a href="https://github.com/xinsight/mobx-redux-showdown/tree/master/redux-starter-kit-app">redux-starter-kit-app</a>: thunks, automatic action creators, simplified connect, redux logic is in a single file, and more

tldr; There are many ways to use Redux - choose wisely!

===

  note: The commentary below only describes `mobx-app` and `redux-app`.

## Number of files

Let's start with something simple and concrete. The number of files:

*Redux*
10

*MobX*
6

Why does Redux have four more files than MobX? That's because of redux's requirement to split things into actions, reducers, selectors, and sagas (for handling the network request).

*Redux*
```
redux-app/src/redux/actions/actions.js
redux-app/src/redux/reducers/reducers.js
redux-app/src/redux/reducers/valueSetsReducer.js
redux-app/src/redux/sagas/sagas.js
redux-app/src/redux/selectors/valueSetSelectors.js
```

*MobX*
```
mobx-app/src/ValueSetStore.js
```

One could argue that it's a clean separation of concerns to split functionality apart into separate files. But it also means that you have to visit all four files in order to do add any practical feature. In MobX, you have a single place, where you can put all related functions (actions), getters (selectors), setters (reducers) and promises (sagas). Is it messy to have all those in one place? Hardly, it seems completely clear and sane.

It's also ironic that Redux wants you to split up your code in to separate files. When React was introduced, it went against traditional wisdom that you should keep your HTML out of your code to keep your code clean. Instead of moving all HTML to templates, React fully embraced the idea of mixing HTML in your code, and I suspect that part of React's success is that everything is in one place. There's no need to jump back and forth from code to HTML, no need to manually keep these files synchronized.

## Verbosity

Ok, so Redux requires managing more files, but what about the code in those files?

Let's compare how you would add a bit of data you add to your app:

*Redux*
- a way to set the data (reducer)
- a way to get the data (selector)
- actions for getting and setting the data

*MobX*
- add a variable to a store
- make it observable

With Mobx and decorators, this can be done with one line. With Redux, the selectors and reducers are added in 2 different files (which we've covered) but there is also the additional idea of an "action". What's up with actions?

Since the parts of Redux are so loosely coupled, you cannot call functions or properties directly, but need to write actions. And then you have to write both sides of the action: the sender which dispatches the action, and a receiver to observe and handle the action. And in both your dispatcher and receiver, you need to make sure to import your action.

I've tried using action creators to generate my actions, but that didn't improve things. You still need to write your annoying string constants like `const FETCH_VALUESET = 'FETCH_VALUESET'` but you have to remember to use the action creator like `fetchValueSetAction()` in the dispatch, and the `FETCH_VALUESET` string constant in the action handler. More things to keep track of.

## Components

So you have a store, and now you want to access the data from a component:

*Redux*
- connect your component
- add/edit mapStateToProps to get (select) data
- add/edit mapDispatchToProps to set (write) data

*MobX*
- inject your store
- call functions to get, set, etc.

With MobX, once you inject your store, you have access to every function and property of the store. You can call functions directly, and don't need to dispatch an action to trigger a network request, or call selectors to get the eventual result of the network request. And you don't need to create the `mapStateToProps` and `mapDispatchToProps` objects.

## Creating a store

Let's take a step back and look at how you setup a store. This is something you don't have to do that often, but it's still critical.

*Redux*
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

*MobX*
```
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
```

Redux clearly requires much more hand-holding - mainly because it doesn't handle asynchronous actions out-of-the-box, you so need to configure it to use a separate library (redux-thunk or redux-saga). MobX is simple enough to be done from memory.

## Debugging

<img src="redux-devtools.png">

In the Redux setup I added the Redux dev tools, because that seems to be a popular tool for visualizing how react works. It's pretty and makes a good first impression, but I prefer the raw JSON to the tree visual. And in practice, I found the devtools to be useful for solving easy problems (a missing property of an action), but unhelpful for solving trickier issues (actions being called unexpectedly or an action not being called at all). I find that adding a breakpoint and typing `JSON.stringify(store)` is often just as useful. It's also a bummer that breakpoints cannot be used with devtools, since once you pause on a breakpoint, the redux devtools are paused as well.

MobX has some in-browser debugging tools, but I've never found the need. You can just drop a breakpoint in your store, and then inspect or step through the code as you normally would.

## Other Libraries

What about helpers and other libraries?

*Redux*
- immutable
- saga-react (or react-thunk)

*MobX*
- [none]

Immutable is not strictly needed, but was recommended for when your global store starts to get complicated. And in this example, just using `getIn` and `setIn` was simpler than having to dealing with plain javascript objects and the spread syntax.

As mentioned, Redux doesn't handle asynchronous operations out of the box, so you need to add some middleware. I looked at a bunch of different libraries, but the general consensus seemed to be that sagas were the new hotness and good for complex logic. They use generator functions and definitely have a learning curve.

## Conclusion

Don't make a decision based on github stars alone.

**Redux**
45k

**MobX**
17k

Browse the code for the [Redux](https://github.com/xinsight/mobx-redux-showdown/tree/master/mobx-app/src) and <a href="https://github.com/xinsight/mobx-redux-showdown/tree/master/mobx-app/src">MobX</a> apps. Let me know if you have any issues or suggestions for improvement.

