/** Applause Outbound Engine - Design Tokens
 *  Source of truth: DESIGN_SYSTEM.md
 *  Use these constants for programmatic access to tokens.
 *  For Tailwind classes, use the CSS custom properties defined in globals.css.
 */

export const colors = {
  primary: "#00579f",
  "primary-container": "#2d70bb",
  "on-primary": "#ffffff",
  "on-primary-container": "#eef3ff",

  secondary: "#455e8c",
  "secondary-container": "#b0cafd",

  tertiary: "#50585d",
  "tertiary-container": "#697076",
  "tertiary-fixed": "#dce3ea",

  surface: "#f9f9ff",
  "surface-container-low": "#f1f3ff",
  "surface-container": "#e8eeff",
  "surface-container-high": "#dfe8ff",
  "surface-container-highest": "#d7e3ff",
  "surface-container-lowest": "#ffffff",
  "surface-variant": "#d7e3ff",

  "on-surface": "#001b3f",
  "on-surface-variant": "#414751",
  "on-background": "#001b3f",
  outline: "#727782",
  "outline-variant": "#c1c6d3",

  "inverse-surface": "#13305a",
  "inverse-on-surface": "#ecf0ff",
  "inverse-primary": "#a5c8ff",

  error: "#ba1a1a",
  "error-container": "#ffdad6",

  background: "#f9f9ff",
} as const;

export const typography = {
  "display-lg": { size: "3.5rem", weight: "700", spacing: "-0.02em" },
  "display-md": { size: "2.25rem", weight: "700", spacing: "-0.02em" },
  "headline-lg": { size: "2rem", weight: "700", spacing: "normal" },
  "headline-md": { size: "1.5rem", weight: "600", spacing: "normal" },
  "title-lg": { size: "1.375rem", weight: "600", spacing: "normal" },
  "title-md": { size: "1rem", weight: "600", spacing: "normal" },
  "body-lg": { size: "1rem", weight: "400", spacing: "normal", lineHeight: "1.6" },
  "body-md": { size: "0.875rem", weight: "400", spacing: "normal" },
  "label-md": { size: "0.75rem", weight: "500", spacing: "0.05em" },
  "label-sm": { size: "0.6875rem", weight: "500", spacing: "0.05em" },
} as const;

export const shadows = {
  ghost: "0px 12px 32px rgba(0, 27, 63, 0.04)",
  lift: "0px 8px 24px rgba(0, 27, 63, 0.06)",
} as const;

export const ghostBorder = "1px solid rgba(193, 198, 211, 0.15)";

export const gradients = {
  primaryCta: "linear-gradient(135deg, #00579f, #2d70bb)",
} as const;
