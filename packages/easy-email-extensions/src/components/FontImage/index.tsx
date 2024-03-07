import React, { useMemo, useState } from 'react';

export function FontImage({ fontName }: { fontName: string }) {
  const [imageLoaded, setImageLoaded] = useState(true);
  const src = useMemo(
    () =>
      `https://stg-sg-notification-email-static-objects-bucket.s3.ap-southeast-1.amazonaws.com/font_images/${fontName}.png`,
    [fontName],
  );

  const handleImageError = () => {
    setImageLoaded(false);
  };

  return (
    <div className='flex align-center h-full'>
      {imageLoaded ? (
        <img
          src={src}
          onError={handleImageError}
          alt={fontName}
          height={20}
        />
      ) : (
        <span>{fontName}</span>
      )}
    </div>
  );
}

export default FontImage;
