import moment from 'moment';

export default function dateFormatFilter(value: string) {
  if (!value?.trim()) {
    return 'n/a'
  }

  return moment(value).format('DD-MM-YYYY');
}
