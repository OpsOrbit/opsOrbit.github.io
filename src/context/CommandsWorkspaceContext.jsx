import { createContext, useContext } from 'react'

export const CommandsWorkspaceContext = createContext(null)

export function useCommandsWorkspace() {
  return useContext(CommandsWorkspaceContext)
}
