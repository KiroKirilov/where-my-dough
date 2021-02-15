import moment from 'moment';

export default function dateFormatFilter(value: number) {
  if (!value) {
    return 'n/a'
  }

  return moment(value).format('DD-MM-YYYY');
}
