//#region imports
import { Routes } from '@angular/router';
import { adminLazyRoute } from '@taon-dev/ui/src';
//#endregion

export const MarketingExampleRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./marketing-example.component').then(
        m => m.MarketingExampleComponent,
      ),
  },
];

/**
 * By default exporting MarketingExampleRoutes,
 * the command `taon generate:app:routes`
 * will automatically add them to the root routes in ./src/app.ts.
 */
// export default MarketingExampleRoutes;
