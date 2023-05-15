import { c as create_ssr_component, e as escape } from "../../chunks/index3.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "button.svelte-skeeqo{background:green;color:#FFF}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let counter = 0;
  $$result.css.add(css);
  return `I&#39;m counting ... ${escape(counter)}
<button class="svelte-skeeqo">Count up</button>`;
});
export {
  Page as default
};
