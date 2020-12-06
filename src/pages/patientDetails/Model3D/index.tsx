import React, { useEffect, useRef } from 'react';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { BASE_URL } from '@/services/patient';
import * as THREE from 'three';

import SceneDemo from './utils/Scene';
import styles from './index.less';

const Model3D = () => {
  const container = useRef();

  const displayModel = () => {
    const scene = new SceneDemo({
      canvas: container,
      width: container.current.offsetWidth,
      height: container.current.offsetHeight,
    });

    // 导入模型, 解析零部件
    const fileLoader = new STLLoader();
    fileLoader.load(`${BASE_URL}/model/2.stl`, (obj) => {
      const material = new THREE.MeshLambertMaterial({
        color: 0x888888,
        // opacity:0.7,
        // transparent:true
      }); // 材质对象Material
      const mesh = new THREE.Mesh(obj, material);
      mesh.position.set(-130, -40, -120);
      // console.log(mesh);
      scene.add(mesh);
    });
  };

  useEffect(() => {
    displayModel();
  }, []);

  return <div ref={container} className={styles.container} />;
};

export default Model3D;
