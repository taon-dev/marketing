import type { TaonMarketingPopupFields } from './taon-marketing-popup.models';

export namespace TaonMarketingPopupUtils {
  export function isActive(
    popup: TaonMarketingPopupFields,
    now = new Date(),
  ): boolean {
    return popup.enabled &&
      (!popup.startAt || new Date(popup.startAt).getTime() <= now.getTime()) &&
      (!popup.endAt || new Date(popup.endAt).getTime() >= now.getTime());
  }

  export function matchesPath(pattern: string, path: string): boolean {
    const pathname = path.split(/[?#]/, 1)[0];
    return pattern.endsWith('*')
      ? pathname.startsWith(pattern.slice(0, -1))
      : pathname === pattern;
  }

  export function isPathPattern(value: string): boolean {
    return /^\/[^?#\s*]*\*?$/.test(value);
  }

  export function allowsPath(popup: TaonMarketingPopupFields, path: string): boolean {
    return (!popup.displayOnPaths?.length ||
      popup.displayOnPaths.some(pattern => matchesPath(pattern, path))) &&
      !popup.excludePaths?.some(pattern => matchesPath(pattern, path));
  }

  export function isSafeUrl(value: string): boolean {
    return !/[\s\\\u0000-\u001f\u007f]/.test(value) &&
      (/^\/(?!\/)/.test(value) || /^https?:\/\/[^/]+/i.test(value));
  }
}