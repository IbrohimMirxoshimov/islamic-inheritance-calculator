import { createContext, useContext, useReducer } from 'react';
import { calculateInheritance } from '@/lib/inheritance-calculator';

type Heir = {
  id: string;
  relationship: string;
  gender: 'male' | 'female';
  count: number;
};

type FinancialDetails = {
  totalEstate: number;
  funeralExpenses: number;
  debts: number;
  wasiyyah: number;
};

type State = {
  heirs: Heir[];
  financialDetails: FinancialDetails;
  results: any | null;
};

type Action =
  | { type: 'ADD_HEIR'; heir: Heir }
  | { type: 'REMOVE_HEIR'; id: string }
  | { type: 'UPDATE_HEIR'; heir: Heir }
  | { type: 'UPDATE_FINANCIAL_DETAILS'; details: Partial<FinancialDetails> }
  | { type: 'CALCULATE_SHARES' }
  | { type: 'RESET' };

const initialState: State = {
  heirs: [],
  financialDetails: {
    totalEstate: 0,
    funeralExpenses: 0,
    debts: 0,
    wasiyyah: 0,
  },
  results: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_HEIR':
      return {
        ...state,
        heirs: [...state.heirs, action.heir],
      };
    case 'REMOVE_HEIR':
      return {
        ...state,
        heirs: state.heirs.filter((heir) => heir.id !== action.id),
      };
    case 'UPDATE_HEIR':
      return {
        ...state,
        heirs: state.heirs.map((heir) =>
          heir.id === action.heir.id ? action.heir : heir
        ),
      };
    case 'UPDATE_FINANCIAL_DETAILS':
      return {
        ...state,
        financialDetails: {
          ...state.financialDetails,
          ...action.details,
        },
      };
    case 'CALCULATE_SHARES':
      return {
        ...state,
        results: calculateInheritance(state.heirs, state.financialDetails),
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const InheritanceContext = createContext<
  | {
      state: State;
      dispatch: React.Dispatch<Action>;
    }
  | undefined
>(undefined);

export function InheritanceProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <InheritanceContext.Provider value={{ state, dispatch }}>
      {children}
    </InheritanceContext.Provider>
  );
}

export const useInheritance = () => {
  const context = useContext(InheritanceContext);
  if (!context) {
    throw new Error('useInheritance must be used within an InheritanceProvider');
  }
  return context;
};