export interface ReactFlipCardProps {
  /**
   * z-Index for the flip card. Used to help solve context stack issues while using multiple flip cards.
   * @default 'auto'
   */
  cardZIndex?: string;
  /**Extra css styling that can be applied to the container.
   * @default {}
   */
  containerStyle?: {};
  /**
   * Custom container class name.
   * @default undefined
   */
  containerClassName?: string;
  /**
   * False to show the front of the card, true to show the back
   * @default undefined
   */
  isFlipped?: boolean;
  /**
   * The speed of the flip animation when the card flips from back to front, the higher the number the slower the flip animation
   * @default 0.6
   */
  flipSpeedBackToFront?: number;
  /**
   * The speed of the flip animation when the card flips from front to back, the higher the number the slower the flip animation
   * @default 0.6
   */
  flipSpeedFrontToBack?: number;

  cardStyles?: { front?: {}; back?: {} };
  /**
   * False to rotate in opposite directions on both sides of the card, true to rotate in the same direction
   * @default false
   */
  infinite?: boolean;

  /**Direction of the card flip (options are: 'horizontal' or 'vertical' )
   * @default 'horizontal'
   */
  flipDirection?: 'horizontal' | 'vertical';
  children: [React.ReactNode, React.ReactNode];
}

declare const ReactCardFlip: React.FC<ReactFlipCardProps>;
export default ReactCardFlip;
