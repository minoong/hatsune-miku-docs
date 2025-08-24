import { InfiniteCarousel } from '~/features/carousel/ui/Infinite-carousel';

export default {
  title: 'features/InfiniteCarousel',
  component: InfiniteCarousel,
};

export const Default = () => <InfiniteCarousel />;

export const Vertical = () => <InfiniteCarousel direction="vertical" />;
