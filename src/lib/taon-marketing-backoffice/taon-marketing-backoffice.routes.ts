//#region imports
import { Routes } from '@angular/router';
import { adminLazyRoute } from '@taon-dev/ui/src';
//#endregion

export const TaonMarketingBackofficeRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./taon-marketing-backoffice.component').then(
        m => m.TaonMarketingBackofficeComponent,
      ),

    children: [
      adminLazyRoute({
        path: 'popup',
        menuItem: 'Popup',
        // @ts-ignore
        icon: 'chat_info',
        expandable: false,
        loader: () =>
          import('@taon-dev/marketing/src').then(
            m => m.TaonMarketingPopupBackofficeRoutes,
          ),
      }),

      adminLazyRoute({
        path: 'promotions',
        menuItem: 'Promotions',
        icon: 'sell',
        expandable: false,
        loader: () =>
          import('@taon-dev/marketing/src').then(
            m => m.TaonMarketingPromoBackofficeRoutes,
          ),
      }),

      adminLazyRoute({
        path: 'newsletter',
        menuItem: 'Newsletter',
        icon: 'info',
        expandable: false,
        loader: () =>
          import('@taon-dev/marketing/src').then(
            m => m.TaonMarketingNewsletterBackofficeRoutes,
          ),
      }),

      adminLazyRoute({
        path: 'ab-testing',
        menuItem: 'AB Testing',
        // @ts-expect-error
        icon: 'science',
        expandable: false,
        loader: () =>
          import('@taon-dev/marketing/src').then(
            m => m.TaonMarketingAbBackofficeRoutes,
          ),
      }),
    ],
  },
];

/**
 * By default exporting TaonMarketingBackofficeRoutes,
 * the command `taon generate:app:routes`
 * will automatically add them to the root routes in ./src/app.ts.
 */
// export default TaonMarketingBackofficeRoutes;
