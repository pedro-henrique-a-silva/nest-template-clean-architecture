export class Optional<T> {
  private value: T | null | undefined

  constructor(value: T | null | undefined) {
    this.value = value
  }

  isPresent(): boolean {
    return this.value !== null && this.value !== undefined
  }

  get(): T {
    return this.value
  }

  orElse(defaultValue: T): T {
    return this.isPresent() ? (this.value as T) : defaultValue
  }

  orElseThrow<E extends Error>(exception: (() => E) | E): T {
    if (this.isPresent()) {
      return this.value!
    }

    if (typeof exception === 'function') {
      throw exception()
    }

    throw exception
  }

  ifPresent(action: (value: T) => void): void {
    if (this.isPresent()) {
      action(this.value as T)
    }
  }

  static of<T>(value: T | null | undefined): Optional<T> {
    return new Optional(value)
  }

  static ofNullable<T>(value: T | null | undefined): Optional<T> {
    return value !== null && value !== undefined
      ? new Optional(value)
      : new Optional<T>(null)
  }
}
