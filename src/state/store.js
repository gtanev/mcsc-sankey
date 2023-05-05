import {
  handleActiveNode,
  handleAnimateFlows,
  handleData,
  handleDisambiguateTypes,
  handleDragEnabled,
  handleDragLock,
  handleDragInProgress,
  handleError,
  handleReset,
} from "./reducers";

const initialState = {
  data: {
    nodes: [],
    links: [],
    maxSort: 0,
  },
  activeNode: null,
  disambiguateTypes: false,
  animateFlows: false,
  dragEnabled: false,
  dragLock: true,
  dragInProgress: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "handleData":
      return handleData(state, action.payload);
    case "handleActiveNode":
      return handleActiveNode(state, action.payload);
    case "handleAnimateFlows":
      return handleAnimateFlows(state, action.payload);
    case "handleDisambiguateTypes":
      return handleDisambiguateTypes(state, action.payload);
    case "handleDragEnabled":
      return handleDragEnabled(state, action.payload);
    case "handleDragLock":
      return handleDragLock(state, action.payload);
    case "handleDragInProgress":
      return handleDragInProgress(state, action.payload);
    case "handleError":
      return handleError(state, action.payload);
    case "handleReset":
      return handleReset();
    default:
      return state;
  }
};

export { initialState, reducer };
