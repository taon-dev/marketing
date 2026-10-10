import { TaonMarketingNewsletterModels } from './taon-marketing-newsletter.models';

export namespace TaonMarketingNewsletterUtils {
  export function isActive(state: string): state is TaonMarketingNewsletterModels.TaonMarketingNewsletterState {
    return state === 'active';
  }
}