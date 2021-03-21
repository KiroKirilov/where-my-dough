import { dateFormats } from '@/common/constants/dateFormats';
import moment from 'moment';

export function dateFormatFilter(value: number) {
  if (!value) {
    return 'n/a'
  }

  return moment(value).format(dateFormats.momentDayFormat);
}

export function monthFormatFilter(value: number) {
  if (!value) {
    return 'n/a'
  }

  return moment(value).format(dateFormats.momentMonthFormat);
}
