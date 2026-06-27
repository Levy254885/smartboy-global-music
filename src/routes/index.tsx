import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
// @ts-expect-error raw import
import bodyHtml from "../content/sbm-body.html?raw";
// @ts-expect-error raw import
import scriptSrc from "../content/sbm-script.js?raw";

export const Route = createFileRoute("/")({
  component: SmartboyHome,
});

function SmartboyHome() {
  useEffect(() => {
    // Run the original inline script (reveal-on-scroll, ticker, etc.)
    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function(scriptSrc as string);
      fn();
    } catch (e) {
      console.error("sbm script error", e);
    }
  }, []);

  return (
    <div
      id="sbm-root"
      // Content authored and provided by the site owner.
      dangerouslySetInnerHTML={{ __html: bodyHtml as string }}
    />
  );
}
