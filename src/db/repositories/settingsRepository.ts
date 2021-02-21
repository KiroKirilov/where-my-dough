import { Settings } from '../models/settings';
import { DbRepository } from './dbRepository';

export class SettingsRepository extends DbRepository<Settings> {
  protected type = 'settings';
}
