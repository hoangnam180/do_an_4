import Image from "next/image";

import empty from "@public/icons/empty.svg";

export default function Empty({ text, ...rest }) {
  return (
    <div className="empty" {...rest}>
      <Image src={empty} alt="" />
      <p>{text || "This category is empty"}</p>
    </div>
  );
}
