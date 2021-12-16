import classNames from "classnames";
import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import styles from "./styles.module.css";

export default function Canvas({
  width,
  height,
  className,
  onDrawEnd,
}: {
  width: number;
  height: number;
  className?: string;
  onDrawEnd?: (url: string) => void;
}) {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [[lastX, lastY], setLastPos] = useState([0, 0]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const finishDrawing = () => {
    if (!canvasRef.current) {
      return;
    }
    onDrawEnd && onDrawEnd(canvasRef.current.toDataURL("img/png", 0.9));
    setIsDrawing(false);
  };

  const onMouseDown: MouseEventHandler<HTMLCanvasElement> = useCallback(
    (ev) => {
      setIsDrawing(true);
      setLastPos([ev.clientX, ev.clientY]);
    },
    []
  );

  const onMouseMove: MouseEventHandler<HTMLCanvasElement> = useCallback(
    (ev) => {
      if (!context) {
        return;
      }
      if (isDrawing) {
        context.strokeStyle = "#f3d024";
        context.lineWidth = 2;
        //console.log(lastX, lastY, ev.clientX, ev.clientY);
        context.beginPath();
        context.moveTo(lastX, lastY);
        context.lineTo(ev.clientX, ev.clientY);
        context.stroke();
        context.closePath();
      }
      setLastPos([ev.clientX, ev.clientY]);
    },
    [context, lastX, lastY]
  );

  const onMouseUp: MouseEventHandler<HTMLCanvasElement> = useCallback(() => {
    finishDrawing();
  }, []);

  const onMouseLeave: MouseEventHandler<HTMLCanvasElement> = useCallback(() => {
    finishDrawing();
  }, []);

  const onInit = () => {
    if (!canvasRef.current) {
      return;
    }
    setContext(canvasRef.current.getContext("2d"));
  };

  useEffect(onInit, []);

  return (
    <div className={classNames(styles.wrapper, className)}>
      <canvas
        width={width}
        height={height}
        ref={canvasRef}
        {...{ onMouseDown, onMouseMove, onMouseUp, onMouseLeave }}
      ></canvas>
    </div>
  );
}
