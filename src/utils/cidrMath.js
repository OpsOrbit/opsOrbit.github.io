/**
 * IPv4 CIDR parsing and display helpers (browser-safe, integer math).
 */

function parseIpv4(ip) {
  const parts = String(ip)
    .trim()
    .split('.')
    .map((x) => Number(x))
  if (parts.length !== 4 || parts.some((p) => !Number.isInteger(p) || p < 0 || p > 255)) {
    throw new Error('Invalid IPv4 address')
  }
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0
}

export function intToIpv4(n) {
  const x = n >>> 0
  return [(x >>> 24) & 255, (x >>> 16) & 255, (x >>> 8) & 255, x & 255].join('.')
}

/**
 * @param {string} cidr e.g. "10.0.0.0/24"
 * @returns {{
 *   networkInt: number,
 *   broadcastInt: number,
 *   prefix: number,
 *   maskInt: number,
 *   wildcardInt: number,
 *   network: string,
 *   broadcast: string,
 *   firstHost: string | null,
 *   lastHost: string | null,
 *   totalAddresses: number,
 *   usableHosts: number | null,
 * }}
 */
export function computeCidr(cidr) {
  const trimmed = String(cidr).trim()
  const m = trimmed.match(/^([\d.]+)\/(\d{1,2})$/)
  if (!m) throw new Error('Use format 192.168.1.0/24')
  const prefix = Number(m[2])
  if (prefix < 0 || prefix > 32) throw new Error('Prefix must be 0–32')

  const ipInt = parseIpv4(m[1])
  const mask =
    prefix === 0 ? 0 : prefix === 32 ? 0xffffffff : (0xffffffff << (32 - prefix)) >>> 0
  const wildcard = (~mask) >>> 0
  const networkInt = (ipInt & mask) >>> 0
  const broadcastInt = (networkInt | wildcard) >>> 0

  const totalAddresses = Math.pow(2, 32 - prefix)
  let firstHost = null
  let lastHost = null
  let usableHosts = null

  if (prefix === 32) {
    usableHosts = 1
    firstHost = intToIpv4(networkInt)
    lastHost = firstHost
  } else if (prefix === 31) {
    usableHosts = 2
    firstHost = intToIpv4(networkInt)
    lastHost = intToIpv4(broadcastInt)
  } else if (prefix === 30) {
    usableHosts = 2
    firstHost = intToIpv4(networkInt + 1)
    lastHost = intToIpv4(broadcastInt - 1)
  } else if (prefix <= 29) {
    usableHosts = totalAddresses - 2
    firstHost = intToIpv4(networkInt + 1)
    lastHost = intToIpv4(broadcastInt - 1)
  } else {
    usableHosts = 0
  }

  return {
    networkInt,
    broadcastInt,
    prefix,
    maskInt: mask,
    wildcardInt: wildcard,
    network: intToIpv4(networkInt),
    broadcast: intToIpv4(broadcastInt),
    firstHost,
    lastHost,
    totalAddresses,
    usableHosts,
  }
}
