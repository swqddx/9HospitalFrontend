import styles from './circlePlay.less';
import CornerStoneDisplay from '../patientDetails/components/CornerStoneDisplay';
import React, { useState } from 'react';
import { BASE_URL } from '@/services/patient';

// interface CirclePlayIProps {
//     // imgList: string[],
//     dicmList: string[],
// }

const CirclePlay: React.FC = (props) => {
  const { dicmList } = props;
  const len = dicmList?.length;
  const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect(() => {
  //     console.log(dicmList[currentIndex]);
  // }, [currentIndex])
  return (
    <>
      <div className={styles.ctDisplay}>
        <CornerStoneDisplay url={`${dicmList[currentIndex].ct_data}`} />
        <br />
        <br />
        <div className={styles.circlePlay}>
          <ul
            className={styles.circlePlayBox}
            style={{
              left: `${Math.max(Math.min(0, -(currentIndex - 1) * 120), -(len - 4) * 120)}px`,
            }}
          >
            {dicmList.map((item, index) => {
              return (
                <img
                  src={`${BASE_URL}${item.image_data}`}
                  key={index}
                  className={`${styles.previewImg} ${
                    currentIndex === index ? styles.currentImg : ''
                  }`}
                  onClick={() => {
                    setCurrentIndex(index);
                  }}
                  alt="预览图"
                />
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CirclePlay;
