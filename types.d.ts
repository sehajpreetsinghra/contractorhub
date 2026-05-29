declare namespace React {
  type ReactNode = unknown;
}

declare namespace JSX {
  type Element = any;
  interface IntrinsicAttributes { key?: string | number; }
  interface IntrinsicElements { [elemName: string]: any; }
}

declare const process: { env: Record<string, string | undefined> };
declare module "*.css";

declare module "next/link" {
  const Link: (props: { href: string; children?: React.ReactNode; className?: string; key?: string | number }) => JSX.Element;
  export default Link;
}

declare module "next/navigation" {
  export function redirect(url: string): never;
}

declare module "next" {
  export type Metadata = Record<string, unknown>;
}

declare module "tailwindcss" {
  export type Config = Record<string, unknown>;
}
