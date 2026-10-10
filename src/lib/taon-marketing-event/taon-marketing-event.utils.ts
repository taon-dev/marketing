import { TaonMarketingEventModels } from './taon-marketing-event.models';

export namespace TaonMarketingEventUtils {
  export function isActive(state: string): state is TaonMarketingEventModels.TaonMarketingEventState {
    return state === 'active';
  }
}