/**
 * HAProxy load balancing; PostgreSQL & Redis CLIs — common ops commands.
 */
export const HAPROXY_COMMANDS = [
  { id: 'haproxy-check', tool: 'haproxy', category: 'Config & reload', level: 'beginner', name: 'Check configuration', command: 'sudo haproxy -c -f /etc/haproxy/haproxy.cfg', description: 'Validate before reload.', explanation: 'Non-zero exit on error. Path varies by distro.' },
  { id: 'haproxy-systemd-reload', tool: 'haproxy', category: 'Config & reload', level: 'beginner', name: 'Reload (systemd)', command: 'sudo systemctl reload haproxy', description: 'Graceful reload new config.', explanation: 'expose-fd listeners require master-worker mode; see HAProxy 2.x docs.' },
  { id: 'haproxy-stats-socket', tool: 'haproxy', category: 'Runtime API', level: 'intermediate', name: 'Stats socket (show info)', command: 'echo "show info" | sudo socat stdio /run/haproxy/admin.sock', description: 'Query via Unix socket.', explanation: 'Configure stats socket in global section. Use show stat, show servers state.' },
  { id: 'haproxy-disable-server', tool: 'haproxy', category: 'Runtime API', level: 'intermediate', name: 'Drain backend server', command: 'echo "disable server bk_name/srv1" | sudo socat stdio /run/haproxy/admin.sock', description: 'Stop new connections to server.', explanation: 'enable server to bring back. Names from config.' },
  { id: 'haproxy-set-weight', tool: 'haproxy', category: 'Runtime API', level: 'advanced', name: 'Set server weight', command: 'echo "set weight bk_name/srv1 50%" | sudo socat stdio /run/haproxy/admin.sock', description: 'Adjust traffic share.', explanation: 'Percent of nominal weight; useful for gradual shifts.' },
  { id: 'haproxy-frontend-acls', tool: 'haproxy', category: 'Patterns', level: 'intermediate', name: 'ACL host header (snippet)', command: 'acl host_api hdr(host) -i api.example.com', description: 'Route by Host.', explanation: 'use_backend api_servers if host_api' },
  { id: 'haproxy-health', tool: 'haproxy', category: 'Health checks', level: 'beginner', name: 'HTTP check (snippet)', command: 'option httpchk GET /health', description: 'Layer7 check line in backend.', explanation: 'Combine with http-check expect status 200 in 2.x syntax.' },
]

export const POSTGRESQL_COMMANDS = [
  { id: 'psql-connect', tool: 'postgresql', category: 'Connection & session', level: 'beginner', name: 'Connect', command: 'psql -h localhost -U myuser -d mydb', description: 'TCP connection with user/db.', explanation: 'PGPASSWORD=... for non-interactive (careful in shell history).' },
  { id: 'psql-local-socket', tool: 'postgresql', category: 'Connection & session', level: 'beginner', name: 'Local peer/socket', command: 'sudo -u postgres psql', description: 'OS peer auth as postgres user.', explanation: 'Common on distro packages for admin tasks.' },
  { id: 'psql-list-db', tool: 'postgresql', category: 'Meta-commands', level: 'beginner', name: 'List databases', command: '\\l', description: 'Inside psql: list DBs.', explanation: '\\l+ for sizes. \\q to quit.' },
  { id: 'psql-list-tables', tool: 'postgresql', category: 'Meta-commands', level: 'beginner', name: 'List tables', command: '\\dt', description: 'Tables in current schema.', explanation: '\\dt+ includes size. \\dn lists schemas.' },
  { id: 'psql-describe', tool: 'postgresql', category: 'Meta-commands', level: 'beginner', name: 'Describe table', command: '\\d table_name', description: 'Columns, indexes, constraints.', explanation: '\\d+ for more detail including storage.' },
  { id: 'psql-timing', tool: 'postgresql', category: 'Meta-commands', level: 'intermediate', name: 'Toggle timing', command: '\\timing', description: 'Show query duration.', explanation: 'Useful when tuning slow queries.' },
  { id: 'psql-explain', tool: 'postgresql', category: 'Query & performance', level: 'intermediate', name: 'Explain analyze', command: 'EXPLAIN (ANALYZE, BUFFERS) SELECT ...;', description: 'Real execution plan with stats.', explanation: 'Runs query; use on non-destructive statements in prod.' },
  { id: 'pg-dump', tool: 'postgresql', category: 'Backup & restore', level: 'beginner', name: 'Dump database', command: 'pg_dump -Fc -f backup.dump mydb', description: 'Custom-format compressed dump.', explanation: '-Fp plain SQL; use pg_restore for custom format.' },
  { id: 'pg-dumpall', tool: 'postgresql', category: 'Backup & restore', level: 'intermediate', name: 'Dump cluster (globals)', command: 'pg_dumpall --globals-only > globals.sql', description: 'Roles and tablespaces.', explanation: 'Full cluster: pg_dumpall > full.sql (large).' },
  { id: 'pg-restore', tool: 'postgresql', category: 'Backup & restore', level: 'beginner', name: 'Restore custom dump', command: 'pg_restore -d mydb -j 4 backup.dump', description: 'Parallel restore.', explanation: 'Create empty target DB first. -c to clean before restore.' },
  { id: 'psql-vacuum', tool: 'postgresql', category: 'Maintenance', level: 'intermediate', name: 'Vacuum analyze', command: 'VACUUM (VERBOSE, ANALYZE);', description: 'Reclaim space and update stats.', explanation: 'Autovacuum handles routine; manual after bulk deletes.' },
  { id: 'psql-conn-count', tool: 'postgresql', category: 'Monitoring', level: 'intermediate', name: 'Connections by state', command: "SELECT state, count(*) FROM pg_stat_activity GROUP BY 1;", description: 'See idle vs active.', explanation: 'Tune max_connections if idle in transaction piles up.' },
]

export const REDIS_COMMANDS = [
  { id: 'redis-ping', tool: 'redis', category: 'Basics', level: 'beginner', name: 'Ping', command: 'redis-cli -h 127.0.0.1 -p 6379 PING', description: 'Liveness check.', explanation: 'Returns PONG. Use in health checks.' },
  { id: 'redis-auth', tool: 'redis', category: 'Basics', level: 'beginner', name: 'Auth', command: 'redis-cli -a secret PING', description: 'Password auth (ACL or requirepass).', explanation: 'Warning: -a may expose password in process list; prefer REDISCLI_AUTH env.' },
  { id: 'redis-info', tool: 'redis', category: 'Info & memory', level: 'beginner', name: 'Server info', command: 'redis-cli INFO server', description: 'Version, uptime, etc.', explanation: 'INFO memory for used_memory_human.' },
  { id: 'redis-dbsize', tool: 'redis', category: 'Keys', level: 'beginner', name: 'Key count', command: 'redis-cli DBSIZE', description: 'Number of keys in current DB.', explanation: 'Not a full scan; O(1) for most deployments.' },
  { id: 'redis-get-set', tool: 'redis', category: 'Keys', level: 'beginner', name: 'Get / set string', command: 'redis-cli SET mykey "hello" GET', description: 'Set with optional previous GET (Redis 6.2+).', explanation: 'Classic: SET key val then GET key.' },
  { id: 'redis-scan', tool: 'redis', category: 'Keys', level: 'intermediate', name: 'Scan keys (safe)', command: 'redis-cli --scan --pattern "user:*"', description: 'Iterate keys without blocking KEYS *.', explanation: 'Use in scripts; KEYS is O(N) and blocks.' },
  { id: 'redis-flushdb', tool: 'redis', category: 'Danger zone', level: 'advanced', name: 'Flush current DB', command: 'redis-cli -n 0 FLUSHDB', description: 'Delete all keys in DB index.', explanation: 'FLUSHALL wipes entire instance. Use only in dev or approved maintenance.' },
  { id: 'redis-slowlog', tool: 'redis', category: 'Monitoring', level: 'intermediate', name: 'Slow log', command: 'redis-cli SLOWLOG GET 10', description: 'Last slow commands.', explanation: 'Tune slowlog-log-slower-than in redis.conf.' },
  { id: 'redis-monitor', tool: 'redis', category: 'Monitoring', level: 'advanced', name: 'Monitor (debug)', command: 'redis-cli MONITOR', description: 'Stream every command (very verbose).', explanation: 'Never on busy production; exposes data.' },
  { id: 'redis-bgsave', tool: 'redis', category: 'Persistence', level: 'intermediate', name: 'Background save', command: 'redis-cli BGSAVE', description: 'Trigger RDB snapshot.', explanation: 'LASTSAVE to check completion timing.' },
]
