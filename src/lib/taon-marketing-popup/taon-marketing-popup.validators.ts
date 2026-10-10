import { ValidatorFn } from '@angular/forms'; // @browser
import { TaonMarketingPopupUtils } from './taon-marketing-popup.utils';

export namespace TaonMarketingPopupValidators {
  //#region @browser
  export const paths: ValidatorFn = control => {
    const value: unknown = control.value;
    return typeof value === 'string' &&
      value.split('\n').map(path => path.trim()).filter(Boolean)
        .every(path => TaonMarketingPopupUtils.isPathPattern(path))
      ? null : { popupPaths: true };
  };

  export const url: ValidatorFn = control => {
    const value: unknown = control.value;
    return typeof value === 'string' &&
      (!value.trim() || TaonMarketingPopupUtils.isSafeUrl(value.trim()))
      ? null : { popupUrl: true };
  };

  export const optionalPositiveInteger: ValidatorFn = control =>
    control.value === null ||
    (Number.isSafeInteger(control.value) && control.value > 0)
      ? null : { popupDisplayLimit: true };

  export const optionalDate: ValidatorFn = control => {
    const value: unknown = control.value;
    return typeof value === 'string' &&
      (!value || Number.isFinite(new Date(value).getTime()))
      ? null : { popupDate: true };
  };
  //#endregion
}