import { execAsync } from "ags/process"

/**
 * Power/session actions for the desktop bar's power menu.
 *
 * Why these run the way they do (useful background if you're new to Linux
 * session management):
 * - `systemctl suspend|reboot|poweroff` asks systemd (specifically
 *   `systemd-logind`) to perform the action. This is the standard way to do
 *   it on an Arch + systemd system, and it works whether or not you're in a
 *   graphical session.
 * - Some setups restrict `systemctl` power actions to logind policy instead.
 *   `loginctl suspend|reboot|poweroff` talks to the same `systemd-logind`
 *   service via a slightly different CLI, so it's used here as a fallback
 *   with `||` if `systemctl` isn't allowed/available for the current user.
 * - `execAsync` (from `ags/process`, the AGS v3 replacement for the old
 *   `Utils.exec`) runs a command in the background and returns a Promise,
 *   so it won't freeze the bar's UI thread while the command runs.
 * - `execAsync` executes the given binary directly — it does NOT go through
 *   a shell, so shell syntax like `||` is not understood by default. To use
 *   it, we explicitly invoke `sh -c "..."`, which spawns a shell that then
 *   interprets the `||`.
 */

/** Runs a shell command via `sh -c`, logging (but not throwing on) failure. */
function runShellCommand(command: string): Promise<string | void> {
  return execAsync(["sh", "-c", command]).catch((error) => {
    console.error(`powerActions: command failed: ${command}`, error)
  })
}

/** Suspends (sleeps) the machine. */
export function sleep() {
  return runShellCommand("systemctl suspend || loginctl suspend")
}

/** Reboots the machine. */
export function reboot() {
  return runShellCommand("systemctl reboot || loginctl reboot")
}

/** Shuts the machine down. */
export function shutdown() {
  return runShellCommand("systemctl poweroff || loginctl poweroff")
}
