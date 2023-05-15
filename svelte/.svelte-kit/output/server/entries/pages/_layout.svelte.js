import { c as create_ssr_component } from "../../chunks/index3.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div style="background: #CCC">${slots.default ? slots.default({}) : ``}</div>`;
});
export {
  Layout as default
};
