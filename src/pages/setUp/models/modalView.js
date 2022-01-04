import { find } from 'lodash';

export default {
  namespace: 'modalView',
  state: {
    modalViews: [],
    currentSelectModalView: null,
    isDrag: false,
  },
  reducers: {
    toggleDrag(state, { payload }) {
      return {
        ...state,
        isDrag: payload.isDrag
      };
    },
    addView(state, { payload }) {
      const newModalViews = state.modalViews.concat(payload.data)
      return {
        ...state,
        modalViews: newModalViews,
        currentSelectModalView: payload.data
      };
    },
    removeView(state, { payload }) {
      const newModalViews = state.modalViews.filter(view => view.id !== payload.id)
      return {
        ...state,
        modalViews: newModalViews,
        currentSelectModalView: null
      };
    },
    clearView(state) {
      return {
        ...state,
        modalViews: [],
        currentSelectModalView: null
      }
    },
    toggleCurrentModalView(state, { payload }) {
      const currentModal = find(state.modalViews, { id: payload.id }, null)
      return {
        ...state,
        currentSelectModalView: currentModal
      };
    },
    hideModalView(state) {
      return {
        ...state,
        currentSelectModalView: null
      };
    },
  }
}