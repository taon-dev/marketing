import { Taon } from 'taon/src';

import { TaonMarketingPopupType } from './taon-marketing-popup.models';
import type { TaonMarketingPopupFields } from './taon-marketing-popup.models';
import { TaonMarketingPopupUtils } from './taon-marketing-popup.utils';

export function popupError(message: string, status = 400): never {
  Taon.error({ message, status });
  throw new Error(message);
}

export function requirePopupId(id: number): void {
  if (!Number.isSafeInteger(id) || id <= 0) {
    popupError('Popup ID must be a positive integer.');
  }
}

export function validatePopup(input: TaonMarketingPopupFields): void {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    popupError('Popup must be an object.');
  }
  if (typeof input.name !== 'string' || !input.name.trim() || input.name.length > 200) {
    popupError('Name is required and must not exceed 200 characters.');
  }
  if (!Object.values(TaonMarketingPopupType).includes(input.type)) {
    popupError('Popup type must be dialog or bottom.');
  }
  if (typeof input.enabled !== 'boolean' || typeof input.oncePerSession !== 'boolean') {
    popupError('Enabled and oncePerSession must be booleans.');
  }
  if (!Number.isFinite(input.delaySeconds) || input.delaySeconds < 0 ||
      input.delaySeconds > 2147483) {
    popupError('Delay must be between 0 and 2147483 seconds.');
  }
  if (input.maxDisplaysPerVisitor !== null &&
      (!Number.isSafeInteger(input.maxDisplaysPerVisitor) || input.maxDisplaysPerVisitor < 1)) {
    popupError('Maximum displays must be a positive integer or null.');
  }
  for (const field of ['title', 'content', 'imageKey', 'buttonText', 'buttonUrl'] as const) {
    if (input[field] !== null && typeof input[field] !== 'string') {
      popupError(`${field} must be a string or null.`);
    }
  }
  if (input.buttonUrl && !TaonMarketingPopupUtils.isSafeUrl(input.buttonUrl)) {
    popupError('Button URL must be an HTTP(S) URL or a root-relative path.');
  }
  for (const field of ['displayOnPaths', 'excludePaths'] as const) {
    const paths = input[field];
    if (paths !== null && (!Array.isArray(paths) || paths.some(path =>
      typeof path !== 'string' || !TaonMarketingPopupUtils.isPathPattern(path)))) {
      popupError(`${field} must contain paths beginning with / and an optional trailing *.`);
    }
  }
  for (const field of ['startAt', 'endAt'] as const) {
    const date = input[field];
    if (date !== null && (!(date instanceof Date || typeof date === 'string') ||
        !Number.isFinite(new Date(date).getTime()))) {
      popupError(`${field} must be a valid date or null.`);
    }
  }
  if (input.startAt && input.endAt &&
      new Date(input.startAt).getTime() > new Date(input.endAt).getTime()) {
    popupError('End date must not precede start date.');
  }
}
