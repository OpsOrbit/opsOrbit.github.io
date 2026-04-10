import { CONCEPTS } from '../data/conceptsData'
import { COMMANDS_DATA } from '../data/commands'
import { DAILY_QUESTIONS } from '../data/dailyQuestions'

/** @param {string} s */
export function hash32(s) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/** Local calendar date YYYY-MM-DD */
export function getLocalDateKey(d = new Date()) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/**
 * @param {string} dateKey
 * @param {number} refreshKey
 */
export function pickDailyConcept(dateKey, refreshKey) {
  const ix = hash32(`daily-concept|${dateKey}|${refreshKey}`) % CONCEPTS.length
  return CONCEPTS[ix]
}

/**
 * @param {string} dateKey
 * @param {number} refreshKey
 */
export function pickDailyCommand(dateKey, refreshKey) {
  const ix = hash32(`daily-cmd|${dateKey}|${refreshKey}`) % COMMANDS_DATA.length
  return COMMANDS_DATA[ix]
}

/**
 * @param {string} dateKey
 * @param {number} refreshKey
 */
export function pickDailyQuestion(dateKey, refreshKey) {
  const ix = hash32(`daily-q|${dateKey}|${refreshKey}`) % DAILY_QUESTIONS.length
  return DAILY_QUESTIONS[ix]
}
