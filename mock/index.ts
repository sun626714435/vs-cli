// eslint-disable-next-line import/no-extraneous-dependencies
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

// const modules = import.meta.glob('./**/*.ts', { eager: true });

// const mockModules: any[] = []
// Object.keys(modules).forEach((key) => {
//   if (key.includes('/_')) {
//     return;
//   }
//   mockModules.push(...(modules as any)[key].default);
// });

import testModule from './demo/user'

export function setupProdMockServer() {
  createProdMockServer([...testModule])
}
