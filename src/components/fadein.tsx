import { useSpring, animated } from "react-spring";
import { FC } from "react";

interface Props {
  children: React.ReactNode;
}

const FadeIn: FC<Props> = ({ children }) => {
  const styles = useSpring({
    from: { opacity: 0, x: 100 },
    to: { opacity: 1, x: 0 },
  });

  return <animated.div style={styles}>{children}</animated.div>;
};

export default FadeIn;
