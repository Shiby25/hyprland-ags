import { createPoll } from "ags/time"

/**
 * Right-side clock widget for the bar.
 *
 * `createPoll(initialValue, intervalMs, fn)` (from `ags/time`) is AGS v3's
 * helper for "run this every N milliseconds and give me the latest result as
 * a reactive value" (an `Accessor`). It replaces the old `Variable` +
 * `setInterval` pattern from earlier AGS versions.
 *
 * `fn` can be a shell command string (e.g. `"date"`, which AGS would spawn as
 * a subprocess every tick) or, as used here, a plain JS function — that's
 * cheaper since it avoids spawning a process every second just to format a
 * timestamp.
 *
 * The `Accessor` returned by `createPoll` can be passed straight into a JSX
 * prop like `label={clock}`: AGS re-renders just that label whenever the
 * value changes, without you having to manually wire up updates.
 */
export default function Clock() {
  const clock = createPoll("", 1000, () => new Date().toLocaleTimeString())

  return <label label={clock} />
}
