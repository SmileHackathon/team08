import React, { CSSProperties, ReactNode } from "react";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { GameMetaData } from "sugit_types/game";
import Panel from "../../../ui/Panel";

import "swiper/css";
import "swiper/css/pagination";

import styles from "./styles.module.css";
import classNames from "classnames";

export default function GamePanel({
  game,
  className,
  style,
  children,
}: {
  game: GameMetaData;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <div className={classNames(styles.wrapper, className)} style={style}>
      <Panel className={styles.panel}>
        <Swiper
          modules={[Autoplay, Pagination]}
          width={320}
          height={180}
          slidesPerView={1}
          autoplay={{
            disableOnInteraction: false,
          }}
          pagination={{
            type: "bullets",
            bulletClass: styles.pagination,
            bulletActiveClass: styles.paginationActive,
          }}
          loop
          noSwiping
          noSwipingSelector="*"
        >
          {game.images.map((imageUrl, index) => (
            <SwiperSlide key={index}>
              <img className={styles.image} src={imageUrl} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={styles.descriptionArea}>
          <div className={styles.title}>{game.name}</div>
          <div className={styles.description}></div>
        </div>
      </Panel>
      {children}
    </div>
  );
}
