import app from "ags/gtk4/app"
import { Astal, Gdk } from "ags/gtk4"
import PowerMenu from "./components/PowerMenu"
import Clock from "./components/Clock"

/**
 * A single desktop bar window, anchored to the top of one monitor.
 *
 * `app.ts` calls `app.get_monitors().map(DesktopBar)`, so this function runs
 * once per connected monitor and each call returns its own `<window>` — this
 * is how AGS puts a bar on every screen rather than just the primary one.
 *
 * `<window>` maps to `Astal.Window`, a `Gtk.Window` with Wayland
 * layer-shell behaviour layered on top (via `gtk4-layer-shell`), which is
 * what lets it dock to a screen edge instead of floating like a normal app
 * window. Notable props used below:
 * - `gdkmonitor`: which physical monitor this window renders on. Passing the
 *   `Gdk.Monitor` object (rather than a plain integer index) is the robust
 *   way to target a monitor — integer indices aren't guaranteed to line up
 *   with how the compositor (Hyprland) numbers its outputs.
 * - `anchor`: which screen edges the window sticks to. `TOP | LEFT | RIGHT`
 *   pins it to the top edge and stretches it across the full width.
 * - `exclusivity`: `EXCLUSIVE` reserves the bar's height as screen space, so
 *   Hyprland won't let other windows overlap it (the same mechanism a
 *   taskbar/panel normally relies on).
 * - `application`: registers the window with the AGS app singleton, which is
 *   needed for things like `ags toggle <name>` / `app.get_window(name)`.
 */
export default function DesktopBar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

  return (
    <window
      visible
      name="bar"
      gdkmonitor={gdkmonitor}
      anchor={TOP | LEFT | RIGHT}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      application={app}
    >
      {/*
        <centerbox> (Gtk.CenterBox) lays out up to three children tagged
        start/center/end, keeping the center one centered and pushing the
        start/end ones to the edges — an easy way to get "left button ...
        right clock" without manually computing spacer widths.
      */}
      <centerbox>
        <PowerMenu $type="start" />
        <box $type="center" />
        <Clock $type="end" />
      </centerbox>
    </window>
  )
}
