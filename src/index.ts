// import "./styles/style.css";
// import "./styles/main.scss";
import "./styles/main.less";
import exampleImage from "./images/icon-square-big.png";

const img: HTMLImageElement | null = document.getElementById(
  "example-img"
) as HTMLImageElement | null;

if (img) {
  img.src = exampleImage;
} else {
  console.error("Element with ID 'example-img' not found.");
}

console.log("Webpack project is working!");
