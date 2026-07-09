import app from "ags/gtk4/app"
import DesktopBar from "./src/features/desktopBar/DesktopBar"

/**
 * Entry point AGS loads when you run `ags run` with no arguments (it looks
 * for `app.{ts,tsx,js,jsx}` at the project root). `main()` runs once, on
 * startup; we use it to spawn one bar window per connected monitor.
 *
 * `style.scss` (generated alongside this file) isn't imported yet — it needs
 * a `sass` compiler on $PATH (e.g. the `dart-sass` package) which isn't
 * installed here, and this first iteration is about functionality, not
 * styling. Install `dart-sass` and add back
 * `import style from "./style.scss"` + `css: style` in `app.start()` when
 * you're ready to style the bar.
 */
app.start({
  main() {
    app.get_monitors().map(DesktopBar)
  },
})
