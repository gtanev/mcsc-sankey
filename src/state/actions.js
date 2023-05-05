import { extractData, transformData } from "../services/api";

const loadData = (dispatch) => {
  extractData()
    .then((data) =>
      dispatch({
        type: "handleData",
        payload: transformData(data),
      })
    )
    .catch((error) =>
      dispatch({
        type: "handleError",
        payload: error,
      })
    );
};

const setActiveNode = (dispatch, payload) => {
  console.log("setActiveNode", payload?.name)
  dispatch({
    type: "handleActiveNode",
    payload,
  });
};

const setAnimateFlows = (dispatch, payload) => {
  dispatch({
    type: "handleAnimateFlows",
    payload,
  });
};

const setDisambiguateTypes = (dispatch, payload) => {
  dispatch({
    type: "handleDisambiguateTypes",
    payload,
  });
};

const setDragEnabled = (dispatch, payload) => {
  dispatch({
    type: "handleDragEnabled",
    payload,
  });
};

const setDragInProgress = (dispatch, payload) => {
  dispatch({
    type: "handleDragInProgress",
    payload,
  });
};

const setDragLock = (dispatch, payload) => {
  dispatch({
    type: "handleDragLock",
    payload,
  });
};

const clearError = (state, dispatch) => {
  dispatch({
    type: "handleError",
    payload: null,
  });
};

export {
  loadData,
  setActiveNode,
  setAnimateFlows,
  setDisambiguateTypes,
  setDragEnabled,
  setDragLock,
  setDragInProgress,
  clearError,
};
