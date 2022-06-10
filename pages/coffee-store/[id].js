import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import styles from "../../styles/conffee-Store.module.css";
import Image from "next/image";
import cls from "classnames";
import { fetchCoffeeStores } from "../../lib/coffeeStore";
import { isEmpy } from "../../utils";
import { useState } from "react";
import { Storecontext } from "../../store/confeeStore";
import useSWR from "swr";

export async function getStaticProps({ params }) {
  const data = await fetchCoffeeStores();
  const findCoffeeStoreId = data.find(
    (coffeeData) => coffeeData.id.toString() === params.id
  );
  return {
    props: {
      CofeeStore: findCoffeeStoreId ? findCoffeeStoreId : {},
    },
  };
}

export async function getStaticPaths() {
  const data = await fetchCoffeeStores();
  const path = data.map((coffee) => coffee.id);
  return {
    paths: [{ params: { id: path.toString() } }],
    fallback: true,
  };
}
const CofeeStore = (intialProps) => {
  const router = useRouter();
  if (router.isFallback) {
    return <p>loding.....</p>;
  }

  const id = router.query.id;

  const [coffeeStore, setCoffeeStore] = useState(intialProps.CofeeStore);
  const {
    state: { coffeeStores },
  } = useContext(Storecontext);

  const handleCreateCoffeeStore = async (coffeeStore) => {
    const { id, name, voting, imgUrl, neighbourhood, address } = coffeeStore;
    try {
      const response = await fetch("/api/createCoffeeStore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          voting: 0,
          neighbourhood: neighbourhood || "",
          address: address || "",
          imgUrl,
        }),
      });
      const coffeeData = await response.json();
    } catch (error) {}
  };
  useEffect(() => {
    if (isEmpy(intialProps.CofeeStore)) {
      if (coffeeStores.length > 0) {
        const findCoffeeStoreFromContext = coffeeStores.find(
          (coffeeData) => coffeeData.id.toString() === id
        );
        if (findCoffeeStoreFromContext) {
          setCoffeeStore(findCoffeeStoreFromContext);
          handleCreateCoffeeStore(findCoffeeStoreFromContext);
        }
      }
    } else {
      handleCreateCoffeeStore(intialProps.CofeeStore);
    }
  }, [id, intialProps, intialProps.CofeeStore]);
  const [voting, setVoting] = useState(0);
  const { address, name, imgUrl, neighbourhood } = coffeeStore;

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(`/api/getCoffeeStoreById?id=${id}`, fetcher);

  useEffect(() => {
    if (data && data.length > 0) {
      setCoffeeStore(data[0]);
      setVoting(data[0].voting);
    }
  }, [data]);

  const handleUpvoteButton = async () => {
    try {
      const response = await fetch("/api/favouriteCoffeeStoreById", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });
      const coffeeData = await response.json();
      setVoting(coffeeData.voting);
    } catch (error) {}
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/"> Back to Home</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            width={600}
            height={368}
            className={styles.storeImg}
            alt={name}
          ></Image>
        </div>
        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image src="/static/icon/places.svg" width="24" height="24"></Image>
            <p className={styles.text}>{address}</p>
          </div>
          {neighbourhood && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icon/nearme.svg"
                width="24"
                height="24"
              ></Image>
              <p className={styles.text}>{neighbourhood[0] || ""}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image src="/static/icon/star.svg" width="24" height="24"></Image>
            <p className={styles.text}>{voting}</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up Vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CofeeStore;

// fsq3L7MqAOmaa4u8Gly5v2OsqxkdPAL1gdipBR5IVX5pb9s=

// const options = {
//   method: "GET",
//   headers: {
//     Accept: "application/json",
//     Authorization: "fsq3L7MqAOmaa4u8Gly5v2OsqxkdPAL1gdipBR5IVX5pb9s=",
//   },
// };

// fetch("https://api.foursquare.com/v3/places/search", options)
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));
