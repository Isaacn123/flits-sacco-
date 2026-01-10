'use client';

import React, { useState } from 'react'
import Image from 'next/image'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
}

export function ImageWithFallback({ 
  src, 
  alt, 
  className = '', 
  style,
  width,
  height,
}: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false)

  if (didError) {
    return (
      <div
        className={`inline-block bg-gray-100 text-center align-middle ${className}`}
        style={style}
      >
        <div className="flex items-center justify-center w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ERROR_IMG_SRC} alt="Error loading image" data-original-url={src} />
        </div>
      </div>
    )
  }

  // For responsive images with w-full h-auto, use a wrapper with fill
  const isResponsive = className.includes('w-full') && className.includes('h-auto')
  
  if (isResponsive || (!width && !height)) {
    const containerClass = isResponsive 
      ? className.replace(/w-full\s*h-auto|h-auto\s*w-full/g, '').trim()
      : className
    return (
      <div className={`relative w-full ${containerClass || ''}`.trim()} style={style}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-contain"
          onError={() => setDidError(true)}
          unoptimized
        />
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width || 800}
      height={height || 600}
      className={className}
      style={style}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      onError={() => setDidError(true)}
      unoptimized
    />
  )
}
