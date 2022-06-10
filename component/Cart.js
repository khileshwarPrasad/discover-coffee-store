import Image from "next/image";
import Link from "next/link";
import React from "react";
import style from "./cart.module.css";
import cls from "classnames";

function Cart(props) {
  return (
    <Link href={props.href}>
      <a className={style.cardLink}>
        <div className={style.container}>
          <div className={cls("glass", style.container)}>
            <div className={style.cardHeaderWrapper}>
              <h2 className={style.cardHeader}>{props.name}</h2>
            </div>
            <div className={style.cardImageWrapper}>
              <Image
                className={style.cardImage}
                src={props.imgUrl}
                width={260}
                height={160}
              />
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}

export default Cart;
