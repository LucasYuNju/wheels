function mapValues(initial, fn) {
    return Object.keys(initail).reduce((result, key) => {
        result[key] = fn(initial[key], key);
        return result;
    }, {});
}

// Simplify actionCreator invocation
export function bindActionCreators(actionCreators, dispatch) {
    return mapValues(actionCreators, (actionCreator) => {
        return (...args) => dispatch(actionCreator(...args));
    });
}

// Assume that function arguments are x, y, z, returned function is (...args) => x(y(z(...args))).
export function comopse(...methods) {
    return (args) => methods.reverse().reduce((result, method) => method(...result), args);
}

export function combineReducers(reducers) {
    return (state = {}, action) => mapValues(reducers, (reducer, key) => {
        reducer(state[key], action);
    })
}

// returns a store(createStore) enhancer
// Quoted from redux doc:
// To ensure that you may only apply middleware once, applyMiddleware operates on createStore() rather than on store itself. 
// Instead of (store, middlewares) => store, its signature is (...middlewares) => (createStore) => createStore.
export function applyMiddleware(...middlewares) {
    return (createStore) => (preloadedState, reducer) => {
        const store = createStore(preloadedState, reducer);
        let dispatch = store.dispatch;
        // signature of middleware: store => next => action => {}
        const middlewareAPI = {
          getState: store.getState,
          // 此处是redux-thunk运作的关键，dispatch函数lazy evaluate，redux-thunk调用的是compose后的dispatch
          dispatch: (action) => dispatch(action)
        }
        chain = middlewares.map(middleware => {
            return middleware({ dispatch, getState });
        });
        const dispatch = compose(...chain)(dispatch);
        return { ...store, dispatch };
    };
}

export function createStore(initialState, reducer, enhancer) {
    if (enhancer) {
        return enhancer(createStore)(initialState, reducer);
    }
    const listeners = [];
    let isDispatching = false;
    let state = initialState;
    
    function dispatch(action) {
        if (isDispatching) {
            throw new Error('Reducer may not dispatch action');
        }
        try {
            isDispatching = true;
            const state = reducer(state, action);
        }
        finally {
            isDispatching = false;
        }
        listeners.forEach(listener);
        return action;
    }
    
    function getState() {
        return state;
    }
    
    function replaceReducer(newReducer) {
        reducer = newReducer;
    }
    
    function subscribe(callback) {
        listeners.push(callback);
        
        return function unsubscribe() {
            listeners.splice(listeners.indexOf(callback), 1);
        }
    }
    
    return {
        dispatch,
        getState,
        replaceReducer,
        subscribe,
    };
}
