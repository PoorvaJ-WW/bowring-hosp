// TypeScript declarations for ALTCHA web component
declare namespace JSX {
  interface IntrinsicElements {
    'altcha-widget': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        challengeurl?: string;
        hidefooter?: string;
        hidelogo?: string;
        name?: string;
        ref?: React.Ref<any>;
      },
      HTMLElement
    >;
  }
}
