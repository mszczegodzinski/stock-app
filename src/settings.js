export var GLOBAL_FETCH_CONTROLLER = new AbortController();
export var GLOBAL_FETCH_SIGNAL = GLOBAL_FETCH_CONTROLLER.signal;
export function resetFetchController() {
  let controller = new AbortController()
  GLOBAL_FETCH_CONTROLLER = controller;
  GLOBAL_FETCH_SIGNAL = controller.signal;
}