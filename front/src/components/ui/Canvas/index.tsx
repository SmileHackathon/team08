import classNames from "classnames";
import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { black, blue, green, main, red } from "../../../constants/colors";
import CanvasColorButton from "../CanvasColorButton";
import CanvasEraserButton from "../CanvasEraserButton";

import styles from "./styles.module.css";

const getRelativePosition = (ev: {
  pageX: number;
  pageY: number;
  target: any;
}): [number, number] => {
  const clickX = ev.pageX;
  const clickY = ev.pageY;

  const clientRect = (ev.target as HTMLCanvasElement).getBoundingClientRect();

  const x = clickX - (clientRect.left + window.pageXOffset);
  const y = clickY - (clientRect.top + window.pageYOffset);

  return [x, y];
};

export default function Canvas({
  width,
  height,
  density = 0.5,
  className,
  baseImage,
  onDrawEnd,
}: {
  width: number;
  height: number;
  density?: number;
  className?: string;
  baseImage?: string;
  onDrawEnd?: (url: string) => void;
}) {
  const [color, setColor] = useState(black);
  const [isEraserActive, setIsEraserActive] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [[lastX, lastY], setLastPos] = useState([0, 0]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const finishDrawing = () => {
    if (!canvasRef.current || !isDrawing) {
      return;
    }
    onDrawEnd && onDrawEnd(canvasRef.current.toDataURL("img/png"));
    setIsDrawing(false);
  };

  const onMouseDown: MouseEventHandler<HTMLCanvasElement> = useCallback(
    (ev) => {
      setIsDrawing(true);
      setLastPos(getRelativePosition(ev));
    },
    []
  );

  const onMouseMove: MouseEventHandler<HTMLCanvasElement> = useCallback(
    (ev) => {
      if (!context || !isDrawing) {
        return;
      }

      const [x, y] = getRelativePosition(ev);

      if (isEraserActive) {
        context.globalCompositeOperation = "destination-out";
        context.strokeStyle = color;
        context.lineWidth = 32 * density;
        context.beginPath();
        context.moveTo(lastX * density, lastY * density);
        context.lineTo(x * density, y * density);
        context.stroke();
        context.closePath();
        context.globalCompositeOperation = "source-over";
      } else {
        context.strokeStyle = color;
        context.lineWidth = 4 * density;
        context.beginPath();
        context.moveTo(lastX * density, lastY * density);
        context.lineTo(x * density, y * density);
        context.stroke();
        context.closePath();
      }
      setLastPos([x, y]);
      console.log(x, y);
    },
    [isDrawing, context, lastX, lastY]
  );

  const onMouseUp: MouseEventHandler<HTMLCanvasElement> = useCallback(() => {
    finishDrawing();
  }, [isDrawing]);

  const onMouseLeave: MouseEventHandler<HTMLCanvasElement> = useCallback(() => {
    finishDrawing();
  }, [isDrawing]);

  const onColorChangeClicked = useCallback((color: string) => {
    setColor(color);
    setIsEraserActive(false);
  }, []);

  const onEraserClicked = useCallback(() => {
    setColor("#FFFFFF");
    setIsEraserActive(true);
  }, []);

  const onInit = () => {
    if (!canvasRef.current) {
      return;
    }
    const context = canvasRef.current.getContext("2d");
    if (!context) {
      return;
    }
    setContext(context);
    context.imageSmoothingEnabled = true;
  };

  const onBaseImageChanged = () => {
    if (!context || !baseImage) {
      return;
    }
    console.log("draw", baseImage);

    const img = new Image();
    img.src = baseImage;
    img.onload = () => {
      context.globalCompositeOperation = "copy";
      context.drawImage(img, 0, 0);
      context.globalCompositeOperation = "source-over";
    };
  };

  useEffect(onInit, []);
  useEffect(onBaseImageChanged, [context, baseImage]);

  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.control}>
        <CanvasColorButton
          color={black}
          onClick={onColorChangeClicked}
          active={black === color}
        />
        <CanvasColorButton
          color={red}
          onClick={onColorChangeClicked}
          active={red === color}
        />
        <CanvasColorButton
          color={green}
          onClick={onColorChangeClicked}
          active={green === color}
        />
        <CanvasColorButton
          color={main}
          onClick={onColorChangeClicked}
          active={main === color}
        />
        <CanvasColorButton
          color={blue}
          onClick={onColorChangeClicked}
          active={blue === color}
        />
        <CanvasEraserButton onClick={onEraserClicked} active={isEraserActive} />
      </div>
      <canvas
        width={width * density}
        height={height * density}
        style={{
          width: width,
          height: height,
        }}
        ref={canvasRef}
        {...{ onMouseDown, onMouseMove, onMouseUp, onMouseLeave }}
      ></canvas>
    </div>
  );
}
