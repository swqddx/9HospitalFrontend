import styles from './circlePlay.less';
import CornerStoneDisplay from '../patientDetails/components/CornerStoneDisplay';
import React, { useState, useEffect } from 'react';

interface CirclePlayIProps {
    imgList: string[],
    dicmList: string[],
}

const CirclePlay: React.FC<CirclePlayIProps> = (props: CirclePlayIProps) => {
    const { imgList, dicmList } = props;
    const len = imgList?.length;
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        console.log(dicmList[currentIndex]);
    }, [currentIndex])
    return (
        <>
            <div className={styles.ctDisplay}>
                <CornerStoneDisplay url={dicmList[currentIndex]} />
                <br />
                <br />
                <div className={styles.circlePlay}>
                    <ul className={styles.circlePlayBox} style={{left: `${Math.max(Math.min(0,-((currentIndex-1)) * 120), -(len-4)*120)}px`}}>
                        {
                            imgList.map((item, index) => {
                                return (
                                    <img
                                        src={`http://202.120.37.220:23333/download/${item}`} key={index}
                                        className={`${styles.previewImg} ${currentIndex === index ? styles.currentImg : ''}`}
                                        onClick={() => { setCurrentIndex(index) }}
                                        alt="预览图"
                                    />
                                );
                            })
                        }
                    </ul>
                </div>
            </div>
        </>
    )

}

export default CirclePlay;