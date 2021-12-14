import React, { CSSProperties } from "react";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { GameMetaData } from "sugit_types/game";
import Panel from "../../../ui/Panel";

import "swiper/css";
import "swiper/css/pagination";

import styles from "./styles.module.css";

export default function GamePanel({
  game,
  style,
}: {
  game: GameMetaData;
  style?: CSSProperties;
}) {
  return (
    <Panel className={styles.panel} style={style}>
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
  );
}
