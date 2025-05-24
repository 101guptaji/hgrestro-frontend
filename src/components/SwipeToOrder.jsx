import React, { useRef, useState } from 'react';
import '../styles/swipeToOrder.css';

const SwipeToOrder = ({ handleOrderSubmit }) => {
    const sliderRef = useRef(null);
    const thumbRef = useRef(null);
    const [isSwiped, setIsSwiped] = useState(false);

    const handleStart = (startX) => {
        const slider = sliderRef.current;
        const thumb = thumbRef.current;
        const sliderRect = slider.getBoundingClientRect();

        const move = (clientX) => {
            const newLeft = Math.min(
                Math.max(0, clientX - sliderRect.left - 25),
                slider.offsetWidth - 50
            );
            thumb.style.left = `${newLeft}px`;

            if (newLeft >= slider.offsetWidth - 60) {
                setIsSwiped(true);
                thumb.style.left = `${slider.offsetWidth - 50}px`;
                cleanup();
                handleOrderSubmit();
            }
        };

        const mouseMove = (e) => move(e.clientX);
        const touchMove = (e) => move(e.touches[0].clientX);

        const end = () => {
            if (!isSwiped) {
                thumb.style.left = `0px`;
            }
            cleanup();
        };

        const cleanup = () => {
            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseup', end);
            document.removeEventListener('touchmove', touchMove);
            document.removeEventListener('touchend', end);
        };

        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', end);
        document.addEventListener('touchmove', touchMove);
        document.addEventListener('touchend', end);
    };

    const onMouseDown = (e) => {
        if (!isSwiped) handleStart(e.clientX);
    };

    const onTouchStart = (e) => {
        if (!isSwiped) handleStart(e.touches[0].clientX);
    };

    return (
        <div className="slider-container">
            <div className="slider" ref={sliderRef}>
                <div
                    className="slider-thumb"
                    ref={thumbRef}
                    onMouseDown={onMouseDown}
                    onTouchStart={onTouchStart}
                    style={{ left: 10 }}
                >
                    <span className="arrow">→</span>
                </div>
                <span className="slider-text">
                    {isSwiped ? 'Order Placed' : 'Swipe to Order'}
                </span>
            </div>
        </div>
    );
};

export default SwipeToOrder;
