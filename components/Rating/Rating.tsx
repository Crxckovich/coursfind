"use client";

import React, { useState, useMemo, useCallback } from 'react';
import {LucideProps, StarIcon} from 'lucide-react';
import cn from 'classnames';
import styles from './Rating.module.css';
import type { StarWrapperProps } from './Rating.props';

const Rating: React.FC<StarWrapperProps> = ({
   numStars = 5,
   icon: IconComponent = StarIcon,
   value = 0,
   disabled = false,
   showcase = false,
   iconProps = {},
   wrapperProps = {},
   onChange,
}) => {
   const { className: wrapperClassName, ...restWrapperProps } = wrapperProps;
   const { className: iconClassName, ...restIconProps } = iconProps;

   const [hoverValue, setHoverValue] = useState(0);

   const handleMouseEnter = useCallback((index: number) => {
      if (!disabled && !showcase) {
         setHoverValue(index + 1);
      }
   }, [disabled, showcase]);

   const handleMouseLeave = useCallback(() => setHoverValue(0), []);

   const handleClick = useCallback((index: number) => {
      if (!disabled) {
         const newValue = index + 1;
         onChange?.(newValue);
      }
   }, [disabled, onChange]);

   const renderStars = useMemo(() => {
      return Array.from({ length: numStars }, (_, i) => {
         const isRated = i < (hoverValue || value);
         const styledIconProps: LucideProps = {
            onMouseEnter: () => handleMouseEnter(i),
            onClick: () => handleClick(i),
            className: cn(styles.icon, iconClassName, {
               [styles.disabled]: disabled,
               [styles.hoverEffect]: !disabled && !showcase,
               [styles.unrated]: !isRated,
            }),
            ...restIconProps,
         };

         return (
            <div key={i}>
               <IconComponent {...styledIconProps} />
            </div>
         );
      });
   }, [numStars, hoverValue, value, disabled, showcase, iconClassName, restIconProps, handleMouseEnter, handleClick, IconComponent]);

   return (
      <div
         className={cn(styles.wrapper, wrapperClassName)}
         {...restWrapperProps}
         onMouseLeave={handleMouseLeave}
      >
         {renderStars}
      </div>
   );
};

export { Rating };