//#region imports
import { TaonBaseRepository, TaonRepository } from 'taon/src';
import { TaonMarketingPopupEntity } from './taon-marketing-popup.entity';
import type { TaonMarketingPopupFields } from './taon-marketing-popup.models';
import { TaonMarketingPopupUtils } from './taon-marketing-popup.utils';
import { popupError, requirePopupId, validatePopup } from './taon-marketing-popup.validation';
//#endregion

@TaonRepository({
  className: 'TaonMarketingPopupRepository',
})
export class TaonMarketingPopupRepository extends TaonBaseRepository<TaonMarketingPopupEntity> {
  entityClassResolveFn: () => typeof TaonMarketingPopupEntity = () => TaonMarketingPopupEntity;

  async activePopups(): Promise<TaonMarketingPopupEntity[]> {
    //#region @websqlFunc
    const popups = await this.find({ where: { enabled: true }, order: { id: 'ASC' } });
    const now = new Date();
    return popups.filter(popup => TaonMarketingPopupUtils.isActive(popup, now));
    //#endregion
  }

  async savePopup(input: TaonMarketingPopupFields, id?: number): Promise<TaonMarketingPopupEntity> {
    //#region @websqlFunc
    validatePopup(input);
    if (id !== undefined) {
      requirePopupId(id);
    }
    const popup = id === undefined
      ? this.repo.create()
      : await this.repo.findOneBy({ id });
    if (!popup) {
      popupError('Popup was not found.', 404);
    }
    Object.assign(popup, {
      name: input.name.trim(),
      enabled: input.enabled,
      type: input.type,
      title: input.title,
      content: input.content,
      imageKey: input.imageKey,
      buttonText: input.buttonText,
      buttonUrl: input.buttonUrl,
      delaySeconds: input.delaySeconds,
      displayOnPaths: input.displayOnPaths,
      excludePaths: input.excludePaths,
      startAt: input.startAt === null ? null : new Date(input.startAt),
      endAt: input.endAt === null ? null : new Date(input.endAt),
      maxDisplaysPerVisitor: input.maxDisplaysPerVisitor,
      oncePerSession: input.oncePerSession,
    });
    return this.repo.save(popup);
    //#endregion
  }

  async setEnabled(id: number, enabled: boolean): Promise<TaonMarketingPopupEntity> {
    //#region @websqlFunc
    requirePopupId(id);
    if (typeof enabled !== 'boolean') {
      popupError('Enabled must be a boolean.');
    }
    const popup = await this.repo.findOneBy({ id });
    if (!popup) {
      popupError('Popup was not found.', 404);
    }
    popup.enabled = enabled;
    return this.repo.save(popup);
    //#endregion
  }

  async deletePopup(id: number): Promise<void> {
    //#region @websqlFunc
    requirePopupId(id);
    const result = await this.repo.delete(id);
    if (!result.affected) {
      popupError('Popup was not found.', 404);
    }
    //#endregion
  }
}