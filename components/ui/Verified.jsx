import { Icon } from "@chakra-ui/react";
import { MdVerified } from "react-icons/md";

export default function Verified({ boxSize = 4 }) {
  return <Icon as={MdVerified} color="#3B82F6" boxSize={boxSize} flexShrink={0} aria-label="Verified" />;
}
