import { initialState } from "./store";

const handleData = (state, payload) => {
  const { nodes, links, maxSort } = payload;
  return {
    ...state,
    data: {
      nodes,
      links,
      maxSort,
    },
  };
};

const handleActiveNode = (state, payload) => {
  return {
    ...state,
    activeNode: state.dragInProgress ? state.activeNode : payload,
  };
};

const handleAnimateFlows = (state, payload) => {
  return {
    ...state,
    animateFlows: payload,
  };
};

const handleDisambiguateTypes = (state, payload) => {
  return {
    ...state,
    disambiguateTypes: payload,
  };
};

const handleDragEnabled = (state, payload) => {
  return {
    ...state,
    dragEnabled: payload,
  };
};

const handleDragLock = (state, payload) => {
  return {
    ...state,
    dragLock: payload,
  };
};

const handleDragInProgress = (state, payload) => {
  return {
    ...state,
    dragInProgress: payload,
  };
};

const handleError = (state, payload) => {
  return {
    ...state,
    error: payload,
  };
};

const handleReset = () => {
  return initialState;
};

export {
  handleData,
  handleActiveNode,
  handleAnimateFlows,
  handleDisambiguateTypes,
  handleDragEnabled,
  handleDragLock,
  handleDragInProgress,
  handleError,
  handleReset,
};
