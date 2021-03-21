import { getMonthMaxAndMin } from '@/common/helpers/dates';
import { Settings } from '../models/settings';
import { DbRepository } from './dbRepository';

export class SettingsRepository extends DbRepository<Settings> {
  protected type = 'settings';

  public async getForMonth(month: number, year: number): Promise<Settings> {
    const { maxValue } = getMonthMaxAndMin(month, year);

    await this.ensureIndex();

    const data = await this.db.find({
      selector: {
        createdOn: {
          $lte: maxValue
        },
        type: this.type
      },
      sort: [{
        createdOn: 'desc'
      }],
      limit: 1
    });

    const settings = (data.docs[0] as unknown) as Settings;

    if (settings) {
      return settings;
    }

    return this.getLatest();
  }
}
