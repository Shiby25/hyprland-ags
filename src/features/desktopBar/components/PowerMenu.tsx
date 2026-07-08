import { Gtk } from "ags/gtk4"
import { sleep, reboot, shutdown } from "../lib/powerActions"

/**
 * Left-side power button: click it to open a dropdown with Sleep/Reboot/
 * Shutdown actions.
 *
 * `<menubutton>` and `<popover>` are plain GTK4 widgets (`Gtk.MenuButton` and
 * `Gtk.Popover`) exposed as built-in JSX intrinsics by AGS — Astal doesn't
 * add its own dropdown/menu abstraction on top of GTK. `<menubutton>`
 * automatically shows its `<popover>` child when clicked and hides it again
 * on an outside click or item activation, so no manual open/close state is
 * needed for this simple case.
 */
export default function PowerMenu() {
  return (
    <menubutton>
      <label label="⏻" />
      <popover>
        <box orientation={Gtk.Orientation.VERTICAL}>
          <button onClicked={sleep}>
            <label label="Sleep" />
          </button>
          <button onClicked={reboot}>
            <label label="Reboot" />
          </button>
          <button onClicked={shutdown}>
            <label label="Shutdown" />
          </button>
        </box>
      </popover>
    </menubutton>
  )
}
