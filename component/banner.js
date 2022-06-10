import React from "react";
import style from "./banner.module.css";

const banner = ({ buttonText, handlOnClick }) => {
  return (
    <div className={style.container}>
      <h1 className={style.title}>
        <span className={style.title1}>Coffee</span>
        <span className={style.title2}>Connoisseur</span>
      </h1>
      <p className={style.subTitle}>Discover your local Coffee Shops</p>
      <div className={style.buttonWrapper}>
        <button className={style.button} onClick={handlOnClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default banner;
