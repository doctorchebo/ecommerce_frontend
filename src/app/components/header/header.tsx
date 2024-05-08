import { setReseller } from "@/app/store/global/globalSlice";
import { useAppDispatch } from "@/app/store/hooks";
import useScroll from "@/hooks/useScroll";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CartIcon from "../cart_icon/cartIcon";
import styles from "./header.module.css";

const Header = () => {
  const dispatch = useAppDispatch();
  const { visible } = useScroll();
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setReseller(event.target.checked));
  };
  const visibleClass = visible ? styles.visible : styles.hidden;
  return (
    <nav className={[styles.container, visibleClass].join(" ")}>
      <div className={styles.logoContainer} onClick={() => router.push("/")}>
        <Image
          src={"/images/dxn.svg"}
          alt="dnx-logo"
          width={526.66669 / 6}
          height={556 / 6}
          priority={true}
        />
      </div>
      <div>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
                color="error"
              />
            }
            label="Soy distribuidor DXN"
            style={{ color: "white" }}
          />
        </FormGroup>
      </div>
      <div className={styles.linksContainer}>
        <Link href={"/cart"}>
          <CartIcon />
        </Link>
      </div>
    </nav>
  );
};

export default Header;
