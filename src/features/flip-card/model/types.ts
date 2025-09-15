export interface FlipCardContent {
  title: string;
  description: string;
  image?: string;
}

export interface FlipCardProps {
  children: React.ReactNode;
  className?: string;
}

export interface FlipCardImageProps {
  src: string;
  alt: string;
  className?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

export interface FlipCardContentProps {
  children: React.ReactNode;
  className?: string;
}

export interface FlipCardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export interface FlipCardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}
