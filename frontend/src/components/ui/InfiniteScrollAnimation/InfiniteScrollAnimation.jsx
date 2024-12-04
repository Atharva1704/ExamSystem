import React from 'react';
import './InfiniteScrollAnimation.css'; // Import the CSS file

const InfiniteScrollAnimation = () => {
    return (
        <div className="app">
            <div className="tag-list">
                <div className="loop-slider" style={{ '--duration': '15951ms', '--direction': 'normal' }}>
                    <div className="inner">
                        <div className="tag"><span>#</span> Mathematics</div>
                        <div className="tag"><span>#</span> Science</div>
                        <div className="tag"><span>#</span> English</div>
                        <div className="tag"><span>#</span> History</div>
                        <div className="tag"><span>#</span> Geography</div>
                        <div className="tag"><span>#</span> Mathematics</div>
                        <div className="tag"><span>#</span> Science</div>
                        <div className="tag"><span>#</span> English</div>
                        <div className="tag"><span>#</span> History</div>
                        <div className="tag"><span>#</span> Geography</div>
                    </div>
                </div>
                <div className="loop-slider" style={{ '--duration': '19260ms', '--direction': 'reverse' }}>
                    <div className="inner">
                        <div className="tag"><span>#</span> Mathematics</div>
                        <div className="tag"><span>#</span> Science</div>
                        <div className="tag"><span>#</span> English</div>
                        <div className="tag"><span>#</span> History</div>
                        <div className="tag"><span>#</span> Geography</div>
                        <div className="tag"><span>#</span> Mathematics</div>
                        <div className="tag"><span>#</span> Science</div>
                        <div className="tag"><span>#</span> English</div>
                        <div className="tag"><span>#</span> History</div>
                        <div className="tag"><span>#</span> Geography</div>
                    </div>
                </div>
                <div className="loop-slider" style={{ '--duration': '10449ms', '--direction': 'normal' }}>
                    <div className="inner">
                        <div className="tag"><span>#</span> Mathematics</div>
                        <div className="tag"><span>#</span> Science</div>
                        <div className="tag"><span>#</span> English</div>
                        <div className="tag"><span>#</span> History</div>
                        <div className="tag"><span>#</span> Geography</div>
                        <div className="tag"><span>#</span> Mathematics</div>
                        <div className="tag"><span>#</span> Science</div>
                        <div className="tag"><span>#</span> English</div>
                        <div className="tag"><span>#</span> History</div>
                        <div className="tag"><span>#</span> Geography</div>
                    </div>
                </div>
                <div className="loop-slider" style={{ '--duration': '16638ms', '--direction': 'reverse' }}>
                    <div className="inner">
                        <div className="tag"><span>#</span> Mathematics</div>
                        <div className="tag"><span>#</span> Science</div>
                        <div className="tag"><span>#</span> English</div>
                        <div className="tag"><span>#</span> History</div>
                        <div className="tag"><span>#</span> Geography</div>
                        <div className="tag"><span>#</span> Mathematics</div>
                        <div className="tag"><span>#</span> Science</div>
                        <div className="tag"><span>#</span> English</div>
                        <div className="tag"><span>#</span> History</div>
                        <div className="tag"><span>#</span> Geography</div>
                    </div>
                </div>
                <div className="loop-slider" style={{ '--duration': '15936ms', '--direction': 'normal' }}>
                    <div className="inner">
                        <div className="tag"><span>#</span> Mathematics</div>
                        <div className="tag"><span>#</span> Science</div>
                        <div className="tag"><span>#</span> English</div>
                        <div className="tag"><span>#</span> History</div>
                        <div className="tag"><span>#</span> Geography</div>
                        <div className="tag"><span>#</span> Mathematics</div>
                        <div className="tag"><span>#</span> Science</div>
                        <div className="tag"><span>#</span> English</div>
                        <div className="tag"><span>#</span> History</div>
                        <div className="tag"><span>#</span> Geography</div>
                    </div>
                </div>
                <div className="fade"></div>
            </div>
        </div>
    );
};

export default InfiniteScrollAnimation;
