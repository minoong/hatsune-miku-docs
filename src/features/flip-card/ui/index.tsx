import { FlipCardRoot } from './flip-card-root';
import { FlipCardImage } from './flip-card-image';
import { FlipCardContent } from './flip-card-content';
import { FlipCardTitle } from './flip-card-title';
import { FlipCardDescription } from './flip-card-description';
import { FlipCardGrid } from './flip-card-grid';

export const FlipCard = Object.assign(FlipCardRoot, {
  Image: FlipCardImage,
  Content: FlipCardContent,
  Title: FlipCardTitle,
  Description: FlipCardDescription,
  Grid: FlipCardGrid,
});

export { FlipCardRoot, FlipCardImage, FlipCardContent, FlipCardTitle, FlipCardDescription, FlipCardGrid };
