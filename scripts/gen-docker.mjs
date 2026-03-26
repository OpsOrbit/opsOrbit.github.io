import fs from 'fs'

const outPath = new URL('../src/data/dockerCommands.js', import.meta.url).pathname

const LEGACY_IDS = new Map([
  ['docker ps -a', 'docker-ps'],
  ['docker images', 'docker-images'],
  ['docker run -d --name myapp -p 8080:80 image', 'docker-run'],
  ['docker build -t myimage:tag .', 'docker-build'],
  ['docker logs -f container', 'docker-logs'],
  ['docker exec -it container /bin/sh', 'docker-exec'],
  ['docker stop container', 'docker-stop'],
  ['docker rm -f container', 'docker-rm'],
  ['docker rmi image', 'docker-rmi'],
  ['docker compose up -d', 'docker-compose-up'],
  ['docker compose logs -f service', 'docker-compose-logs'],
  ['docker inspect container', 'docker-inspect'],
  ['docker network ls', 'docker-network'],
  ['docker volume ls', 'docker-volume'],
  ['docker system prune -a --volumes', 'docker-system-prune'],
])

function makeId(cmd) {
  const norm = cmd.trim().replace(/\s+/g, ' ')
  if (LEGACY_IDS.has(norm)) return LEGACY_IDS.get(norm)
  let slug = norm
    .replace(/^docker\s+/i, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9._<>/:=-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
  let id = `docker-${slug || 'cmd'}`
  if (id.length > 80) id = id.slice(0, 80).replace(/-$/, '')
  return id
}

const rows = []
function add(category, level, name, command, description, explanation) {
  rows.push({ category, level, name, command, description, explanation })
}

/* Setup & Info */
add('Setup & Info', 'beginner', 'Docker version', 'docker version', 'Client and server version information.', 'Shows API version; use when debugging client/server mismatch.')
add('Setup & Info', 'beginner', 'System-wide info', 'docker info', 'Display configuration, storage driver, runtimes, and resource summary.', 'First stop for “why won’t containers start?” on a host.')
add('Setup & Info', 'beginner', 'Help', 'docker help', 'List commands or show help for a subcommand.', 'Same as <code>docker --help</code>; drill: <code>docker run --help</code>.')
add('Setup & Info', 'beginner', 'Login to registry', 'docker login', 'Authenticate to a container registry.', 'Stores credentials; use hostname for non-Docker Hub registries.')
add('Setup & Info', 'beginner', 'Logout from registry', 'docker logout', 'Remove stored registry credentials.', 'Optional registry host argument.')
add('Setup & Info', 'intermediate', 'System info (alias)', 'docker system info', 'Same family as <code>docker info</code> for engine details.', 'Useful in scripts that expect the <code>system</code> subcommand tree.')
add('Setup & Info', 'intermediate', 'Disk usage', 'docker system df', 'Show disk used by images, containers, and volumes.', 'Run before prune to see reclaimable space.')
add('Setup & Info', 'intermediate', 'Prune unused data', 'docker system prune', 'Remove stopped containers, unused networks, dangling images.', 'Does not remove tagged unused images by default.')
add('Setup & Info', 'advanced', 'Aggressive system prune', 'docker system prune -a', 'Also remove all unused images, not just dangling.', 'Add <code>--volumes</code> to prune unused volumes—destructive.')

/* Images */
add('Images', 'beginner', 'List images', 'docker images', 'List local images (legacy top-level).', 'Same information as <code>docker image ls</code>.')
add('Images', 'beginner', 'List images (image ls)', 'docker image ls', 'List images with filters and formatting.', 'Use <code>-q</code> for IDs only; <code>--filter</code> for dangling, etc.')
add('Images', 'beginner', 'Pull image', 'docker image pull nginx:latest', 'Download an image from a registry.', 'Defaults to Docker Hub; specify registry/repo:tag explicitly.')
add('Images', 'intermediate', 'Push image', 'docker image push myregistry/myimage:tag', 'Upload a tagged image to a registry.', 'Must be logged in; tag must match remote name.')
add('Images', 'intermediate', 'Remove image', 'docker image rm myimage:tag', 'Delete one or more images locally.', 'Fails if containers still use the image; use <code>-f</code> with care.')
add('Images', 'intermediate', 'Prune unused images', 'docker image prune', 'Remove dangling images.', 'Add <code>-a</code> for all unused images.')
add('Images', 'intermediate', 'Inspect image', 'docker image inspect myimage:tag', 'JSON metadata: layers, env, entrypoint, architecture.', 'Use <code>--format</code> for one field.')
add('Images', 'intermediate', 'Image history', 'docker image history myimage:tag', 'Show layers and commands that built the image.', 'Helps understand image size and Dockerfile steps.')
add('Images', 'beginner', 'Tag image', 'docker image tag source:tag target:tag', 'Create another tag pointing to the same image ID.', 'Common before push to registry path.')
add('Images', 'beginner', 'Build image', 'docker build -t myimage:tag .', 'Build from Dockerfile in context directory.', 'Use <code>-f</code> for alternate Dockerfile path.')
add('Images', 'intermediate', 'Build with tag', 'docker build -t myapp:latest .', 'Tag result during build.', 'Multiple <code>-t</code> for extra tags.')
add('Images', 'intermediate', 'Build without cache', 'docker build --no-cache -t myimage:tag .', 'Ignore layer cache for a clean rebuild.', 'Slower; use when debugging Dockerfile dependency issues.')
add('Images', 'advanced', 'BuildKit / buildx build', 'docker buildx build -t myimage:tag .', 'Advanced builds: multi-platform, cache exporters.', 'Requires buildx setup; common in CI for arm64+amd64.')
add('Images', 'intermediate', 'Save image to tar', 'docker save -o myimage.tar myimage:tag', 'Export image layers to a tarball.', 'Move air-gapped or to another host; pair with <code>docker load</code>.')
add('Images', 'intermediate', 'Load image from tar', 'docker load -i myimage.tar', 'Import images from <code>docker save</code> tarball.', 'Restores tags included in the archive.')

/* Containers */
add('Containers', 'beginner', 'Run container', 'docker run -d --name myapp -p 8080:80 image', 'Create and start a container from an image.', 'Classic pattern: detached, named, published port.')
add('Containers', 'beginner', 'Run detached', 'docker run -d nginx', 'Run in background and print container ID.', 'Add <code>--name</code> and <code>-p</code> for real services.')
add('Containers', 'beginner', 'Run interactive TTY', 'docker run -it ubuntu bash', 'Interactive shell in a new container.', 'Stops when shell exits unless <code>-d</code> combined carefully.')
add('Containers', 'beginner', 'Run with name', 'docker run --name web nginx', 'Assign a stable name for start/stop/logs.', 'Names must be unique on the daemon.')
add('Containers', 'beginner', 'Start container', 'docker start container', 'Start a stopped container.', 'Does not create; use <code>run</code> for new instances.')
add('Containers', 'beginner', 'Stop container', 'docker stop container', 'SIGTERM then SIGKILL after grace period.', 'Default grace 10s; <code>-t</code> to shorten.')
add('Containers', 'beginner', 'Restart container', 'docker restart container', 'Stop then start.', 'Useful after config changes on restart policy.')
add('Containers', 'intermediate', 'Kill container', 'docker kill container', 'Send SIGKILL (or other signal) immediately.', 'Faster than stop; data may be lost mid-write.')
add('Containers', 'intermediate', 'Pause processes', 'docker pause container', 'Freeze all processes in the container.', 'Uses cgroup freezer; unpause to resume.')
add('Containers', 'intermediate', 'Unpause', 'docker unpause container', 'Resume a paused container.', 'Opposite of <code>docker pause</code>.')
add('Containers', 'beginner', 'Remove container', 'docker rm container', 'Delete a stopped container.', 'Use <code>-f</code> to force-remove running.')
add('Containers', 'intermediate', 'Force remove', 'docker rm -f container', 'Stop if needed and delete.', 'Use when stuck in restarting state.')
add('Containers', 'beginner', 'List running containers', 'docker ps', 'Default list: running only.', '<code>-q</code> for IDs; <code>--filter</code> for status.')
add('Containers', 'beginner', 'List all containers', 'docker ps -a', 'Include exited and created.', 'Essential cleanup and debugging.')
add('Containers', 'intermediate', 'Inspect container', 'docker inspect container', 'Full JSON: mounts, network, state, config.', 'Use <code>--format</code> with a Go template (e.g. <code>{{.State.Status}}</code>) in scripts.')
add('Containers', 'beginner', 'Container logs', 'docker logs -f container', 'View stdout/stderr; <code>-f</code> follow.', 'Add <code>--tail 100</code>, <code>--since</code> for large logs; Ctrl+C stops following only.')
add('Containers', 'beginner', 'Exec in container', 'docker exec -it container /bin/sh', 'Run a process in a running container.', 'Replace shell path if image has only sh.')
add('Containers', 'intermediate', 'Exec interactive', 'docker exec -it container bash', 'TTY + interactive for shells.', 'Requires container to stay running.')
add('Containers', 'intermediate', 'Attach to main process', 'docker attach container', 'Attach stdin/stdout to container primary process.', 'Ctrl+C may kill process—use <code>docker exec</code> for safer shells.')
add('Containers', 'intermediate', 'Copy files', 'docker cp host.txt container:/path/', 'Copy between host and container filesystem.', 'Works both directions; be mindful of permissions.')
add('Containers', 'beginner', 'Rename container', 'docker rename old new', 'Change container name.', 'Useful before commit or orchestration.')
add('Containers', 'intermediate', 'Resource stats', 'docker stats', 'Live CPU, memory, network for running containers.', 'One-shot: <code>--no-stream</code>.')
add('Containers', 'intermediate', 'Processes in container', 'docker top container', 'List processes inside container.', 'Like ps for the container PID namespace.')
add('Containers', 'advanced', 'Wait for exit', 'docker wait container', 'Block until exit; print exit code.', 'Useful in shell scripts.')
add('Containers', 'intermediate', 'Update resources', 'docker update --cpus=2 container', 'Change limits on running container.', 'Not all fields apply live—check docs.')
add('Containers', 'intermediate', 'Filesystem diff', 'docker diff container', 'Changed files vs image.', 'Shows C for add, D delete, M modify.')
add('Containers', 'beginner', 'Published ports', 'docker port container', 'Show host port mapping.', 'Or inspect HostConfig.PortBindings.')

/* Volumes */
add('Volumes', 'beginner', 'Create volume', 'docker volume create myvol', 'Create a named volume.', 'Use mount in <code>docker run -v myvol:/data</code>.')
add('Volumes', 'beginner', 'List volumes', 'docker volume ls', 'Show local volumes.', 'Filter with <code>-f dangling=true</code>.')
add('Volumes', 'intermediate', 'Inspect volume', 'docker volume inspect myvol', 'Driver, mountpoint, labels.', 'Mountpoint path on Linux for debugging.')
add('Volumes', 'intermediate', 'Remove volume', 'docker volume rm myvol', 'Delete unused volume.', 'Fails if still referenced by a container.')
add('Volumes', 'advanced', 'Prune volumes', 'docker volume prune', 'Remove all unused local volumes.', 'Data loss—confirm prompts.')

/* Networks */
add('Networks', 'intermediate', 'Create network', 'docker network create mynet', 'User-defined bridge (default driver).', 'Attach with <code>docker run --network mynet</code>.')
add('Networks', 'beginner', 'List networks', 'docker network ls', 'Show bridge, host, overlay, custom.', 'NAME and DRIVER columns.')
add('Networks', 'intermediate', 'Inspect network', 'docker network inspect mynet', 'Containers attached, IPAM, options.', 'JSON for automation.')
add('Networks', 'intermediate', 'Connect container', 'docker network connect mynet container', 'Attach running container to another network.', 'Use for multi-homed services.')
add('Networks', 'intermediate', 'Disconnect', 'docker network disconnect mynet container', 'Remove container from network.', 'Stops container using that network alias.')
add('Networks', 'intermediate', 'Remove network', 'docker network rm mynet', 'Delete if no containers attached.', 'Cannot remove predefined bridge/host/none in use.')
add('Networks', 'advanced', 'Prune networks', 'docker network prune', 'Remove unused user-defined networks.', 'Does not remove default bridge.')

/* Docker Compose */
add('Docker Compose', 'beginner', 'Compose up', 'docker compose up', 'Create and start services from compose file.', 'Add <code>-d</code> for detached.')
add('Docker Compose', 'beginner', 'Compose up detached', 'docker compose up -d', 'Background services.', 'Build images if needed unless <code>--no-build</code>.')
add('Docker Compose', 'beginner', 'Compose down', 'docker compose down', 'Stop and remove containers, networks.', 'Add <code>-v</code> to remove named volumes—careful.')
add('Docker Compose', 'intermediate', 'Compose start', 'docker compose start', 'Start existing containers.', 'After <code>stop</code> or create.')
add('Docker Compose', 'intermediate', 'Compose stop', 'docker compose stop', 'Stop without removing containers.', 'Preserves volumes and anonymous containers unless removed.')
add('Docker Compose', 'intermediate', 'Compose restart', 'docker compose restart', 'Rolling restart of services.', 'Useful after .env or bind-mount changes.')
add('Docker Compose', 'intermediate', 'Compose build', 'docker compose build', 'Build or rebuild service images.', '<code>--no-cache</code> for clean builds.')
add('Docker Compose', 'beginner', 'Compose logs', 'docker compose logs', 'Aggregate logs from services.', 'Service name optional; default all.')
add('Docker Compose', 'beginner', 'Follow compose logs', 'docker compose logs -f service', 'Stream logs for one or all services.', 'Multiple services: list names.')
add('Docker Compose', 'beginner', 'Compose ps', 'docker compose ps', 'Status of compose project containers.', 'Shows health if defined.')
add('Docker Compose', 'intermediate', 'Compose exec', 'docker compose exec service sh', 'Run command in running service container.', 'Like <code>docker exec</code> with compose service names.')
add('Docker Compose', 'intermediate', 'Compose pull', 'docker compose pull', 'Pull images for services.', 'Updates to tags in compose file.')
add('Docker Compose', 'intermediate', 'Compose push', 'docker compose push', 'Push service images to registry.', 'Requires build with pushable tags.')
add('Docker Compose', 'intermediate', 'Validate compose file', 'docker compose config', 'Render merged YAML; validate syntax.', 'Use <code>-q</code> for quiet success only.')

/* Registry & Context */
add('Registry & Context', 'intermediate', 'List contexts', 'docker context ls', 'Show Docker endpoint contexts.', 'Switch between local, remote, cloud.')
add('Registry & Context', 'intermediate', 'Use context', 'docker context use mycontext', 'Make CLI talk to another daemon/endpoint.', 'Verify with <code>docker info</code>.')
add('Registry & Context', 'advanced', 'Create context', 'docker context create remote --docker host=ssh://user@host', 'Define remote Docker over SSH or TCP.', 'TLS and SSH supported.')
add('Registry & Context', 'intermediate', 'Inspect context', 'docker context inspect default', 'JSON for one context.', 'Shows host metadata and TLS.')
add('Registry & Context', 'intermediate', 'Remove context', 'docker context rm mycontext', 'Delete context definition.', 'Cannot remove in-use default without switching first.')
add('Registry & Context', 'beginner', 'Search Hub images', 'docker search nginx', 'Search Docker Hub (limited).', 'Prefer registry UI or API for serious search.')

/* Advanced */
add('Advanced', 'intermediate', 'Event stream', 'docker events', 'Real-time daemon events (create, die, attach).', 'Filter with <code>--filter</code>.')
add('Advanced', 'intermediate', 'Export container FS', 'docker export container > rootfs.tar', 'Flatten container filesystem to tar.', 'No history/metadata like image.')
add('Advanced', 'intermediate', 'Import tarball as image', 'docker import rootfs.tar myimage:tag', 'Create image from filesystem archive.', 'Different from <code>load</code> (image save format).')
add('Advanced', 'advanced', 'Checkpoint (experimental)', 'docker checkpoint', 'Manage container checkpoints (CRIU where supported).', 'Platform and storage driver dependent.')
add('Advanced', 'advanced', 'Create checkpoint', 'docker checkpoint create checkpoint1 container', 'Save running state.', 'Restore with <code>docker start --checkpoint</code> where available.')
add('Advanced', 'advanced', 'List checkpoints', 'docker checkpoint ls container', 'List checkpoints for container.', 'Requires experimental features on daemon.')
add('Advanced', 'advanced', 'Remove checkpoint', 'docker checkpoint rm checkpoint1 container', 'Delete checkpoint.', 'Free storage used by checkpoint data.')
add('Advanced', 'advanced', 'Plugin install', 'docker plugin install <plugin>', 'Install a Docker plugin from the registry.', 'Review permissions prompt; often used for volume/network drivers.')
add('Advanced', 'intermediate', 'List plugins', 'docker plugin ls', 'Installed volume/network/auth plugins.', 'Enable/disable without uninstall.')
add('Advanced', 'advanced', 'Enable plugin', 'docker plugin enable plugin', 'Activate disabled plugin.', 'May require daemon restart for some types.')
add('Advanced', 'advanced', 'Disable plugin', 'docker plugin disable plugin', 'Stop plugin without removing.', 'Volumes using plugin may be affected.')
add('Advanced', 'advanced', 'Remove plugin', 'docker plugin rm plugin', 'Uninstall plugin.', 'Must be disabled first.')
add('Advanced', 'advanced', 'Content trust', 'docker trust', 'Manage image signing and signers (Notary).', 'Enterprise workflows; requires configured Notary.')
add('Advanced', 'intermediate', 'Inspect manifest', 'docker manifest inspect myimage:tag', 'Show multi-arch manifest list or config.', 'Useful for verifying digests in CI.')

const seen = new Map()
const objs = []
for (const r of rows) {
  let id = makeId(r.command)
  if (seen.has(id)) {
    let n = 2
    while (seen.has(`${id}-${n}`)) n++
    id = `${id}-${n}`
  }
  seen.set(id, true)
  objs.push({
    id,
    tool: 'docker',
    category: r.category,
    level: r.level,
    name: r.name,
    command: r.command,
    description: r.description,
    explanation: r.explanation,
  })
}

const header = `/**
 * Docker command reference — categorized (setup, images, containers, compose, etc.).
 * Generated by scripts/gen-docker.mjs
 */
export const DOCKER_COMMANDS = `

fs.writeFileSync(outPath, `${header}${JSON.stringify(objs, null, 2)};\n`)
console.log('Wrote', objs.length, 'docker commands')
