import { createContext } from '~/shared/lib/utils/create-context';
import type { TabContextType } from '~/features/tabs/model/type';

export const [TabProvider, useTabContext, TabContext] = createContext<TabContextType>({
  name: 'TabContext',
  hookName: 'useTabContext',
  providerName: 'TabProvider',
  errorMessage: 'useTabContext는 반드시 TabProvider 안에서 사용되어야 합니다',
});
