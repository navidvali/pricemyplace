import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import classes from './LoadingAnimation.module.css'

const LoadingAnimation = (props) => {
    const circleRef = useRef(null);
  
    useEffect(() => {
      const circleElement = circleRef.current;
  
      // Initialize GSAP animation
      gsap.set(circleElement, { transformOrigin: 'center', scale: 0 });
  
      const tl = gsap.timeline({ repeat: -1 });
  
      // Animation timeline
      tl.to(circleElement, { duration: 0.8, scale: 1, ease: 'power1.inOut' })
        .to(circleElement, { duration: 0.8, scale: 0, ease: 'power1.inOut' })
        .to(circleElement, { duration: 0.8, scale: 1, ease: 'power1.inOut' })
        .to(circleElement, { duration: 0.8, scale: 0, ease: 'power1.inOut' });
  
      return () => {
        tl.kill(); // Kill the animation on unmount
      };
    }, []);
  
    return (
      <div className={classes.loadingAnimation}>
        <div ref={circleRef} className={classes.circle} style={{width: `${props.w}px`, height: `${props.h}px`}}></div>
      </div>
    );
};

export default LoadingAnimation