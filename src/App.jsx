import './index.css';
import Balatro from './Backgrounds/Balatro/Balatro';
import Dither from './Backgrounds/Dither/Dither';
import TiltedCard from './Components/TiltedCard/TiltedCard.tsx';
import React, { useRef, useEffect, useState } from 'react';

function App() {
  const appRef = useRef(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // デバイスがモバイルかどうかを検出する
  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isTouchDevice && isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // マウス位置を追跡する
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (appRef.current) {
        const rect = appRef.current.getBoundingClientRect();
        mousePositionRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const cardData = [
    {
      imageSrc: "https://i.scdn.co/image/ab67616d0000b273e36376a9c9d5b63ab8893476",
      altText: "Liam Gallagher - C'MON YOU KNOW",
      captionText: "Liam Gallagher - C'MON YOU KNOW",
      linkUrl: "https://open.spotify.com/album/7IpAa9HvutfL3LsDsgluqY"
    },
    {
      imageSrc: "https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58",
      altText: "Kendrick Lamar - GNX",
      captionText: "Kendrick Lamar - GNX",
      linkUrl: "https://open.spotify.com/album/0hvT3yIEysuuvkK73vgdcW"
    },
    {
      imageSrc: "https://i.scdn.co/image/ab67616d0000b2735ef878a782c987d38d82b605",
      altText: "Kanye West - Donda",
      captionText: "Kanye West - Donda",
      linkUrl: "https://open.spotify.com/album/5CnpZV3q5BcESefcB3WJmz"
    }
  ];

  return (
    <div className="App" ref={appRef} style={{ height: '100vh', overflow: 'hidden' }}>
      <div className="fixed-backgrounds" style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 0 
      }}>
        <div className="balatro-container" style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          zIndex: 1,
          pointerEvents: 'none'
        }}>
          <Balatro
            isRotate={true}
            mouseInteraction={!isMobile}
            spinRotation={0.1}
            spinSpeed={0.1}
            pixelFilter={isMobile ? 500 : 2000}
          />
        </div>

        <div className="dither-container" style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          zIndex: 2, 
          pointerEvents: 'none',
          display: isMobile ? 'none' : 'block'
        }}>
          <Dither
            waveColor={[0.3, 0.3, 0.3]}
            disableAnimation={false}
            enableMouseInteraction={!isMobile}
            mouseRadius={1.4}
            colorNum={4}
            waveAmplitude={0.53}
            waveFrequency={1.6}
            waveSpeed={0.01}
            pixelSize={1}
          />
        </div>
      </div>

      <div className="scrollable-content" style={{ 
        position: 'relative',
        zIndex: 3,
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '20px'
      }}>
        <div className="cards-container" style={{ 
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          flexWrap: isMobile ? 'nowrap' : 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '30px',
          minHeight: '100vh',
          padding: '40px 20px',
          paddingTop: isMobile ? '10vh' : '30vh',
          paddingBottom: isMobile ? '30vh' : '30vh'
        }}>
          {cardData.map((card, index) => (
            <div key={index} style={{ 
              margin: isMobile ? '20px 0' : '0 20px',
              flex: isMobile ? '0 0 auto' : '0 0 300px'
            }}>
              <TiltedCard
                imageSrc={card.imageSrc}
                altText={card.altText}
                captionText={card.captionText}
                containerHeight="300px"
                containerWidth="300px"
                imageHeight="300px"
                imageWidth="300px"
                rotateAmplitude={isMobile ? 10 : 12}
                scaleOnHover={isMobile ? 1.05 : 1.2}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={true}
                linkUrl={card.linkUrl}
                overlayContent={
                  <p style={{ 
                    fontSize: '16px', 
                    fontWeight: 'bold',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
                  }}>
                    {card.captionText}
                  </p>
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
