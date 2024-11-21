import * as moment from 'moment'

export class DateValueObject {
  value: moment.Moment

  constructor(date?: string | Date) {
    if (date) {
      const parsedDate = moment(date)

      this.value = parsedDate
    } else {
      this.value = moment()
    }
  }

  getDate(): Date {
    return this.value.utc().startOf('day').toDate()
  }

  toDateFormated(): string {
    return this.value.utc().format('YYYY-MM-DD')
  }

  toDateTimeFormated(): string {
    return this.value.format('YYYY-MM-DD HH:mm:ss')
  }

  toHourFormated(): string {
    return this.value.format('HH:mm')
  }

  toString(): string {
    return this.value ? this.value.format('YYYY-MM-DD') : 'No date provided'
  }

  static now(): moment.Moment {
    return moment()
  }
}
