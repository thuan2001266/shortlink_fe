declare module "save-svg-as-png" {
  export function saveSvgAsPng(
    svg: HTMLElement | string,
    filename: string,
    options?: {
      scale?: number;
      backgroundColor?: string;
    },
    callback?: (error: Error | null) => void
  ): void;
}
