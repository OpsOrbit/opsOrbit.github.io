/**
 * DevOps Command Hub - Command reference data
 * Each command: id, tool, level, name, command, description, explanation; optional category
 */
import { GIT_COMMANDS } from './gitCommands.js'
import { LINUX_COMMANDS } from './linuxCommands.js'
import { KUBERNETES_COMMANDS } from './kubernetesCommands.js'
import { TERRAFORM_COMMANDS } from './terraformCommands.js'
import { DOCKER_COMMANDS } from './dockerCommands.js'
import { ANSIBLE_COMMANDS } from './ansibleCommands.js'
import { AWS_COMMANDS } from './awsCommands.js'
import { HELM_COMMANDS } from './helmCommands.js'
import { GITHUB_ACTIONS_COMMANDS } from './githubActionsCommands.js'
import { NGINX_COMMANDS, APACHE_COMMANDS } from './webServerCommands.js'
import { TOMCAT_COMMANDS } from './tomcatCommands.js'
import { PROMETHEUS_COMMANDS, GRAFANA_COMMANDS } from './monitoringCommands.js'
import { HAPROXY_COMMANDS, POSTGRESQL_COMMANDS, REDIS_COMMANDS } from './haproxyPostgresRedisCommands.js'

export const COMMANDS_DATA = [
  ...GIT_COMMANDS,
  ...LINUX_COMMANDS,
  ...KUBERNETES_COMMANDS,
  ...TERRAFORM_COMMANDS,
  ...DOCKER_COMMANDS,
  ...ANSIBLE_COMMANDS,
  ...AWS_COMMANDS,
  ...HELM_COMMANDS,
  ...GITHUB_ACTIONS_COMMANDS,
  ...NGINX_COMMANDS,
  ...APACHE_COMMANDS,
  ...TOMCAT_COMMANDS,
  ...PROMETHEUS_COMMANDS,
  ...GRAFANA_COMMANDS,
  ...HAPROXY_COMMANDS,
  ...POSTGRESQL_COMMANDS,
  ...REDIS_COMMANDS,

  // ---- MAVEN ----
  { id: 'mvn-compile', tool: 'maven', level: 'beginner', name: 'Compile', command: 'mvn compile', description: 'Compile main source code.', explanation: '<code>mvn test-compile</code> for tests.' },
  { id: 'mvn-test', tool: 'maven', level: 'beginner', name: 'Run tests', command: 'mvn test', description: 'Run unit tests.', explanation: '<code>-DskipTests</code> skip tests. <code>-Dmaven.test.failure.ignore=true</code> do not fail.' },
  { id: 'mvn-package', tool: 'maven', level: 'beginner', name: 'Package', command: 'mvn package', description: 'Build JAR/WAR.', explanation: 'Output in target/. Use <code>-DskipTests</code> to skip tests.' },
  { id: 'mvn-install', tool: 'maven', level: 'beginner', name: 'Install', command: 'mvn install', description: 'Package and install to local repo.', explanation: 'Puts in ~/.m2/repository.' },
  { id: 'mvn-clean', tool: 'maven', level: 'beginner', name: 'Clean', command: 'mvn clean', description: 'Delete target directory.', explanation: 'Often: <code>mvn clean package</code>.' },
  { id: 'mvn-dependency-tree', tool: 'maven', level: 'intermediate', name: 'Dependency tree', command: 'mvn dependency:tree', description: 'Display dependency tree.', explanation: '<code>-Dverbose</code> for conflicts.' },
  { id: 'mvn-archetype', tool: 'maven', level: 'intermediate', name: 'Create project', command: 'mvn archetype:generate -DgroupId=com.app -DartifactId=myapp', description: 'Generate from archetype.', explanation: 'Use <code>-DarchetypeArtifactId=maven-archetype-quickstart</code>.' },
  { id: 'mvn-versions', tool: 'maven', level: 'advanced', name: 'Update versions', command: 'mvn versions:set -DnewVersion=2.0.0', description: 'Set project version.', explanation: 'Commit: <code>versions:commit</code>. Revert: <code>versions:revert</code>.' },
  { id: 'mvn-plugins', tool: 'maven', level: 'advanced', name: 'Effective POM', command: 'mvn help:effective-pom', description: 'Show effective POM.', explanation: 'Plugin: <code>help:describe -Dplugin=...</code>.' },

  // ---- SHELL SCRIPTING ----
  { id: 'shell-shebang', tool: 'shell', level: 'beginner', name: 'Shebang', command: '#!/usr/bin/env bash', description: 'First line: interpreter for script.', explanation: '<code>#!/bin/bash</code> or <code>env bash</code> for PATH.' },
  { id: 'shell-vars', tool: 'shell', level: 'beginner', name: 'Variables', command: 'VAR=value; echo "$VAR"', description: 'Set variable. Quote when expanding.', explanation: '<code>export VAR</code>. <code>${VAR:-default}</code> for default.' },
  { id: 'shell-args', tool: 'shell', level: 'beginner', name: 'Arguments', command: '$1 $2 $@ $#', description: '$1 first arg, $@ all, $# count.', explanation: '$0 script name. <code>shift</code> to drop first.' },
  { id: 'shell-if', tool: 'shell', level: 'beginner', name: 'Conditional', command: 'if [ -f file ]; then ...; fi', description: 'Test with [ ] or [[ ]]. -f file, -d dir.', explanation: 'Use <code>[[ ]]</code> in bash for patterns.' },
  { id: 'shell-loop', tool: 'shell', level: 'beginner', name: 'For loop', command: 'for f in *.txt; do echo "$f"; done', description: 'Loop over list.', explanation: 'Range: <code>for i in {1..5}; do ...; done</code>.' },
  { id: 'shell-while', tool: 'shell', level: 'intermediate', name: 'While loop', command: 'while read line; do echo "$line"; done < file', description: 'Loop while condition true.', explanation: 'Pipe creates subshell; prefer < file.' },
  { id: 'shell-func', tool: 'shell', level: 'intermediate', name: 'Function', command: 'myfunc() { echo "$1"; }', description: 'Define function.', explanation: 'Return: <code>return 0</code>. Capture: <code>$(myfunc)</code>.' },
  { id: 'shell-exit', tool: 'shell', level: 'intermediate', name: 'Exit code', command: 'exit 0', description: 'Exit with code. 0 success.', explanation: 'Last exit: <code>$?</code>. <code>set -e</code> exit on error.' },
  { id: 'shell-set', tool: 'shell', level: 'intermediate', name: 'Set options', command: 'set -euo pipefail', description: '-e exit on error, -u undefined error, -o pipefail.', explanation: 'Best practice. <code>set +e</code> to allow errors.' },
  { id: 'shell-test', tool: 'shell', level: 'intermediate', name: 'File tests', command: '[ -f f ] [ -d d ] [ -z "$s" ]', description: '-f file, -d dir, -z string empty.', explanation: 'Also -e exists, -w writable, -x executable.' },
  { id: 'shell-subshell', tool: 'shell', level: 'intermediate', name: 'Command substitution', command: '$(command)', description: 'Replace with command output.', explanation: 'Prefer $( ). <code>files=$(ls)</code>.' },
  { id: 'shell-redirect', tool: 'shell', level: 'intermediate', name: 'Redirect', command: '> out 2> err 2>&1 &>> log', description: '> stdout, 2> stderr, 2>&1 merge.', explanation: '< file stdin. <code>|</code> pipe.' },
  { id: 'shell-trap', tool: 'shell', level: 'advanced', name: 'Trap', command: 'trap "cleanup" EXIT', description: 'Run command on signal or exit.', explanation: '<code>trap "rm -f tmp" EXIT</code>. <code>trap - EXIT</code> disable.' },
  { id: 'shell-case', tool: 'shell', level: 'advanced', name: 'Case', command: 'case $x in a) ;; b) ;; esac', description: 'Multi-way branch. ;; end branch.', explanation: '<code>*)</code> default. Use for argument parsing.' },
]
