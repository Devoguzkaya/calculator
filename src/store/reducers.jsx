import {
  APPLY_NUMBER,
  CHANGE_OPERATION,
  CLEAR_DISPLAY,
  EQUALS,
  MEMORY_ADD,
  MEMORY_CLEAR,
  MEMORY_RECALL,
} from './actions.jsx';

export const initialState = {
  total: 0,
  operation: '+',
  memory: 0,
  currentInput: '',
};

const calculateResult = (num1, num2, operation) => {
  switch (operation) {
    case '+':
      return num1 + num2;
    case '*':
      return num1 * num2;
    case '-':
      return num1 - num2;
    case '/':
      return num1 / num2;
    default:
      return;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case APPLY_NUMBER:
      return {
        ...state,
        currentInput: state.currentInput + String(action.payload),
      };

    case CHANGE_OPERATION:
      return {
        ...state,
        total: state.currentInput
          ? calculateResult(
              state.total,
              Number(state.currentInput),
              state.operation
            )
          : state.total,
        operation: action.payload,
        currentInput: '',
      };
    case CLEAR_DISPLAY:
      return {
        ...state,
        total: 0,
        currentInput: '',
      };
    case EQUALS:
      return {
        ...state,
        total: calculateResult(
          state.total,
          Number(state.currentInput),
          state.operation
        ),
        currentInput: '',
        operation: '=',
      };

    case MEMORY_ADD:
      return {
        ...state,
        memory: Number(state.currentInput || state.total),
      };

    case MEMORY_CLEAR:
      return {
        ...state,
        memory: 0,
      };

    case MEMORY_RECALL:
      return {
        ...state,
        currentInput: String(state.memory),
      };

    default:
      return state;
  }
};

export default reducer;
