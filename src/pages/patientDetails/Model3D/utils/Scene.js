import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';

class SceneDemo {
  constructor(_option) {
    this.$canvas = _option.canvas;
    this.width = _option.width;
    this.height = _option.height;

    this.setScene();
    this.setCamera();
    this.setAxis();
    this.setLight();
    this.setRenderer();
    // this.setPlane();

    this.controls = new OrbitControls(this.camera, this.renderer.domElement); // 创建控件对象
    this.controls.enabled = true;

    this.transform = new TransformControls(this.camera, this.renderer.domElement);

    this.render = () => {
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.render);
    };

    this.render();
  }

  // 场景设置
  setScene() {
    this.scene = new THREE.Scene();
    // this.scene.fog = new THREE.Fog(0x000000, 0, 500);
  }

  // 渲染器设置
  setRenderer() {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0xb9d3ff, 1); // 设置背景颜色
    this.renderer.shadowMap.enabled = true; // 设置阴影
    this.$canvas.current.appendChild(this.renderer.domElement); // 指定容器中插入canvas对象
  }

  // 场景相机设置
  setCamera() {
    this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 2000);
    this.camera.position.set(0, 200, -200);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0)); // 设置相机方向(指向的场景对象)
    this.scene.add(this.camera);
    /**
     *  辅助相机设置
     */
    // const cameraHelper = new THREE.CameraHelper(this.camera);
    // scene.add(cameraHelper);
  }

  // 场景光线设置
  setLight() {
    // 环境光
    // this.ambient = new THREE.AmbientLight(0xffffff, 100);
    // this.scene.add(this.ambient);
    // // 点光源
    // this.pointMiddle = new THREE.PointLight(0xffffff);
    // this.pointMiddle.position.set(0, 200, 0); // 点光源位置
    // this.scene.add(this.pointMiddle); // 点光源添加到场景中
    // 设置用于计算阴影的光源对象
    // this.pointMiddle.castShadow = true;

    // this.pointleft = new THREE.PointLight(0x666666);
    // this.pointleft.position.set(100, 200, 0); // 点光源位置
    // this.scene.add(this.pointleft); // 点光源添加到场景中

    // this.pointright = new THREE.PointLight(0x666666);
    // this.pointright.position.set(-100, 200, 0); // 点光源位置
    // this.scene.add(this.pointright); // 点光源添加到场景中

    // 点光源
    this.point = new THREE.PointLight(0xffffff, 0.3);
    this.point.position.set(400, 200, 300); // 点光源位置
    this.scene.add(this.point); // 点光源添加到场景中
    // 环境光
    this.ambient = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(this.ambient);
    // 方向光1
    this.directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.5);
    this.directionalLight1.position.set(400, 200, 300);
    this.scene.add(this.directionalLight1);
    // 方向光2
    this.directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    this.directionalLight2.position.set(-400, -200, -300);
    this.scene.add(this.directionalLight2);
  }

  // 辅助坐标系
  setAxis() {
    this.axis = new THREE.AxesHelper(10);
    this.scene.add(this.axis);
  }

  // 添加/更替鼠标控制器
  setOrbitControls(switch4) {
    // 添加鼠标控制器
    if (switch4) {
      this.controls.enabled = true; // 监听鼠标、键盘事件
    } else {
      this.controls.enabled = false;
    }
  }

  add(item) {
    this.scene.add(item);
  }

  // 设置底部平面
  setPlane() {
    this.planeGeometry = new THREE.PlaneGeometry(1000, 1000, 1, 1);
  }
}

export default SceneDemo;
