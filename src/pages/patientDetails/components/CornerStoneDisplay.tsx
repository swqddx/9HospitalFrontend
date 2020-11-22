import React, { useRef, useEffect } from 'react';

import * as cornerstone from "cornerstone-core";
// Cornerstone 工具外部依赖
import Hammer from "hammerjs";
import * as cornerstoneMath from "cornerstone-math";
import * as cornerstoneTools from "cornerstone-tools";
// 不建议 npm 安装 cornerstoneWADOImageLoader 如果你做了 会很头疼
import * as cornerstoneWADOImageLoader from "./cornerstoneWADOImageLoader.js";

// Specify external dependencies
cornerstoneTools.external.Hammer = Hammer;
cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
cornerstoneWADOImageLoader.external.cornerstoneMath = cornerstoneMath;

// 指定要注册加载程序的基石实例
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;

cornerstone.registerImageLoader("http", cornerstoneWADOImageLoader.loadImage);
cornerstone.registerImageLoader("https", cornerstoneWADOImageLoader.loadImage);

// 配置 webWorker (必须配置)
// 注意这里的路径问题  如果路径不对 cornerstoneWADOImageLoaderWebWorker 会报错 index.html Uncaught SyntaxError: Unexpected token <
const config = {
    webWorkerPath: "./cornerstoneWADOImageLoaderWebWorker.js",
    taskConfiguration: {
        decodeTask: {
            codecsPath: "./cornerstoneWADOImageLoaderCodecs.js",
        },
    },
};
cornerstoneWADOImageLoader.webWorkerManager.initialize(config);

interface IProps {
    url?: string;
}

const CornerStoneDisplay: React.FC<IProps> = (props) => {
    const { url } = props;
    const canvasImg = useRef();

    const initCanvasTools = () => {
        // Enable Inputs
        cornerstoneTools.mouseInput.enable(canvasImg.current);
        cornerstoneTools.mouseWheelInput.enable(canvasImg.current);
        cornerstoneTools.touchInput.enable(canvasImg.current);

        // // Set the stack as tool state
        cornerstoneTools.addStackStateManager(canvasImg.current, ["stack"]);
        cornerstoneTools.stackScrollWheel.activate(canvasImg.current); // Mouse wheel
        cornerstoneTools.scrollIndicator.enable(canvasImg.current); // Position indicator

        // Mouse
        cornerstoneTools.wwwc.activate(canvasImg.current, 1); // left click
        cornerstoneTools.pan.activate(canvasImg.current, 2); // middle click
        cornerstoneTools.zoom.activate(canvasImg.current, 4); // right click

        // Touch / Gesture
        cornerstoneTools.wwwcTouchDrag.activate(canvasImg.current); // - Drag
        cornerstoneTools.zoomTouchPinch.activate(canvasImg.current); // - Pinch
        cornerstoneTools.panMultiTouch.activate(canvasImg.current); // - Multi (x2)
    };

    const showImg = () => {
        cornerstone.enable(canvasImg.current);
        // 拼接 url : cornerstoneWADOImageLoader 需要 wadouri 路径头
        const current_img = `wadouri:http://202.120.37.220:23333/download/${url}`;
        //  Load & Display`
        cornerstone.loadAndCacheImage(current_img).then(
            (image) => {
                console.log(image);
                image.maxPixelValue = 1687;
                image.minPixelValue = 0;

                // 设置元素视口
                const viewport = cornerstone.getDefaultViewportForImage(
                    canvasImg.current,
                    image
                );
                // 显示图像
                cornerstone.displayImage(canvasImg.current, image, viewport);
                // 激活工具
                initCanvasTools();
            },
            (err) => {
                alert(err);
            }
        );
    };

    useEffect(() => {
        showImg();
    }, [url])




    return (
        <div ref={canvasImg} style={{ height: '380px', width: '600px', margin: 'auto' }}>

        </div>
    );
}








export default CornerStoneDisplay;