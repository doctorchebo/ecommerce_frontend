"use client";
import { Figtree } from "next/font/google";
import Products from "./components/products/products";
import styles from "./page.module.css";

const figTree = Figtree({ subsets: ["latin"] });

export default function Home() {
  return (
      <div className={[styles.container, figTree.className].join(" ")}>
        <Products />
      </div>
  );
}
