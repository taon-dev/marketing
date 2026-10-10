# Marketing

A small Taon module for configurable website popups. Marketing backoffice has
**Popups**, **Promotions**, **Newsletter**, and **AB** navigation. Only Popups is
functional; the other pages are placeholders. Coupon/discount business logic
belongs to ecommerce, and newsletter sending and experimentation are not included.

## Popup management

Include `TaonMarketingAbstractContext` in the application context and mount
`TaonMarketingBackofficeRoutes` through the standard Taon admin navigation (as in
the example app). Popups can be created, edited, deleted, enabled, and disabled.
New popups are disabled by default.

`TaonMarketingPopupEntity` uses the existing Taon TypeORM entity registration
(`createTable: true`), with inherited ID/version and automatic creation/update
timestamps. The registered `MarketingContext_1791659700000_popup_configuration`
migration creates a missing popup table or adds the configuration columns to the
old scaffold table, preserving legacy descriptions as names where available.
It also supports contexts where schema synchronization has already run. Hosts
with a different concrete context should register this migration in that context.
Reverting removes popup configuration fields and retains names in the legacy
description column; back up the database before reverting.

The popup controller restricts exposed methods to
reads, pagination, validated writes, and active-popup loading. Configure access to
administrative controller methods using the host application's authorization policy;
`getActivePopups` is the website read endpoint.

## Website rendering

Import `TaonMarketingPopupsComponent` from `@taon-dev/marketing/src` into a standalone
Angular component and place one host in the public website layout:

```html
<taon-marketing-popups
  [resolveImage]="resolveMarketingImage"
  (popupEvent)="onPopupEvent($event)"
  (popupError)="onPopupError($event)">
</taon-marketing-popups>
```

The image resolver and event/error handlers are optional. Image keys default to
HTTP(S) URLs or root-relative asset paths. For object-storage keys, provide a
synchronous resolver returning the public image URL. CTA URLs must also be HTTP(S)
or root-relative. Content is plain text, not executable HTML.

The renderer loads enabled, date-active popups initially and after Angular router
navigation. Date boundaries are inclusive. Empty display paths means every path;
exclusions take precedence. Path rules match the pathname (ignoring query/fragment)
exactly, or by prefix when ending in `*`, e.g. `/shop/*`.

Each delay starts when the page's popup response arrives. Eligible popups display
one at a time, in delay/ID order. Navigation cancels pending displays and closes
visible popups; eligibility is checked again before display. End dates also close
visible popups. Dialog popups support an optional image; bottom banners do not.
Popups scheduled to start later become eligible on a subsequent page load/navigation.

Visitor display counts use localStorage; once-per-session uses sessionStorage
(a browser-tab session). Counts are incremented on display, not on fetch.
These are browser-local limits, not authenticated-user or cross-device limits;
clearing storage resets them. If storage is unavailable or corrupt, rendering
fails closed and reports an error rather than ignoring restrictions.

## Analytics extension point

The `popupEvent` output emits `popup-impression`, `popup-click`, and `popup-close`
with category `marketing`, path, creation date, and data containing popup ID/type.
Connect this output to the host's generic AnalyticsEvent ingestion when available.
No statistics columns or analytics dependency are added. The analytics package's
event API is currently scaffold-only, so this module does not force integration.