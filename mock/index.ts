// eslint-disable-next-line import/no-extraneous-dependencies
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

// const modules = import.meta.glob('./**/*.ts');

// const mockModules: any[] = []
// Object.keys(modules).forEach((key) => {
//   if (key.includes('/_')) {
//     return;
//   }
//   mockModules.push(...(modules as any)[key].default);
// });
// export function setupProdMockServer() {
//   createProdMockServer(mockModules)
// }

import user from './demo/user'
import menu from './demo/menu'

export function setupProdMockServer() {
  createProdMockServer([user, menu])
}
