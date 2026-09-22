# Frozen Cubo runtime for the Opus handoff

Copied on 2026-09-07 from the live Cubo workspace used by the showcase. This is a dependency snapshot, not an invitation to edit the production kit.

Refreshed on 2026-09-10: `ui/cubo-ui-vue.{js,css}` и `index.d.ts` пересобраны
из `ui-docs/packages/vue` (коммит `8f0ddd7` — новый Select: neutral inset
меню, чек справа, круглые теги). `icons.js` и `registry-*.js` не изменились.

- `ui/cubo-ui-vue.js`, `icons.js`, `registry-C8AtAPDw.js`, `cubo-ui-vue.css`, `index.d.ts`: compiled `@cuboapp/ui-vue` 2.0.0; source package declares MIT. Runtime externals: Vue and Vue Router. Icons are registered Tabler icons, not the private Flaticon provider.
- `styles/`: compiled `@cuboapp/styles`, MIT; license preserved as LICENSE-styles.
- Tabler Icons: MIT, notice preserved in LICENSE-Tabler.
- Inter Variable: OFL-1.1, notice preserved in LICENSE-Inter. Font faces are loaded from the local styles/fonts.css.
- `src/styles/_gtc-tokens.scss` is the exact DS Lab generated token layer used at capture time. It is intentionally local to remove the source app's absolute macOS Sass path.

Source repositories remain in the user's Cubo workspace. This private handoff does not publish proprietary icon providers or require private registry credentials. Preserve these notices and the frozen bundle. Use index.d.ts and actual exports to check available component APIs.
