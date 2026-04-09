/**
 * Maps tool category → DevOps lifecycle stages (for interactive lifecycle filter).
 */
export const LIFECYCLE_STAGE_IDS = ['plan', 'code', 'build', 'test', 'release', 'operate', 'monitor']

/** @type {Record<string, string[]>} */
export const CATEGORY_LIFECYCLE_STAGES = {
  collab: ['plan', 'monitor'],
  scm: ['code'],
  cicd: ['build', 'release'],
  build: ['build'],
  artifacts: ['build', 'release'],
  containers: ['build', 'operate'],
  registries: ['release', 'operate'],
  orchestration: ['operate'],
  iac: ['release'],
  configmgmt: ['release', 'operate'],
  secrets: ['release', 'operate'],
  monitoring: ['monitor'],
  logging: ['monitor'],
  security: ['test', 'operate'],
  testing: ['test'],
  apim: ['release', 'operate'],
  mesh: ['operate'],
  cloud: ['operate'],
  serverless: ['release', 'operate'],
  cdn: ['operate', 'release'],
}

/**
 * @param {import('./toolsData').DEVOPS_TOOLS[number]} tool
 * @param {string} stageId
 */
export function toolMatchesLifecycleStage(tool, stageId) {
  const stages = CATEGORY_LIFECYCLE_STAGES[tool.categoryId]
  if (!stages?.length) return false
  return stages.includes(stageId)
}
