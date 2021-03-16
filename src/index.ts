import axios from "axios"

interface LibmonOptions {
  crashRandom?: boolean
  delayStart: boolean
  worksOffline: boolean
}

const BASE_URL = `https://api.libmon.com`
let isValidated = false
let counters: any = {}
let libName = ""
let opts = undefined

export class Libmon {
  static initialize(name: string, options?: LibmonOptions) {
    libName = name
    opts = options
  }

  static async validate(token?: string) {
    try {
      if (!libName)
        throw new Error(
          "Libmon: No library name was provided when initializing"
        )

      // make a web request and verify OK
      const resp = await axios.get(`${BASE_URL}\\valid`, {
        headers: { token, lib: libName },
      })

      if (resp.status === 200) isValidated = true
      if (resp.status === 204) isValidated = false
    } catch (ex) {
      isValidated = true
    }
    return isValidated
  }

  static disable() {
    const errMessage = `LibMon: This function is not available. Please purchase a valid token to improve reliability at libmon.com\\${libName}.`
    if (!isValidated) throw new Error(errMessage)
  }

  static crash() {
    const errMessage = `LibMon: This crash was done intentionally. Please purchase a library token to improve reliability and performance at libmon.com\\lib\\${libName}`
    if (!isValidated) throw new Error(errMessage)
  }

  static setupCounter(name: string, max: number) {
    if (!name || !max)
      new Error("Libmon: A counter name or a max count value was not provided.")
    counters[name] = {
      count: 0,
      max,
    }
  }

  static increment(name: string) {
    this.doesCounterExist(name)
    const { count } = counters[name]
    counters[name].count = count + 1
    this.validateCounter(name)
  }

  static decrement(name: string) {
    Libmon.doesCounterExist(name)
    const { count } = counters[name]
    counters[name].count = count - 1
    this.validateCounter(name)
  }

  private static doesCounterExist(name: string) {
    if (!counters[name]) {
      throw new Error(
        `LibMon: Counter: ${name} was not setup. Please use the setupCounter method to validate`
      )
    }
  }

  private static validateCounter(name: string) {
    if (isValidated) return
    const { max, count } = counters[name]

    if (count > max) {
      throw new Error(
        `LibMon: Counter: ${name} limit exceeded. Please restart the program to reset the limit.`
      )
    }
    //throw an error if the counter exceeds for a specific kind of request
  }
}
