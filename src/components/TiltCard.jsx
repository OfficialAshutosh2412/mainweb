/**
 * Card wrapper component without any tilt effect.
 * Provides clean layout, subtle hover transitions, and styling compatibility.
 */
const TiltCard = ({
  children,
  className = '',
  delay = 0,
  maxTilt,
  glareOpacity,
  scale,
  perspective,
  glowColor,
  style = {},
  ...props
}) => {
  return (
    <div
      style={style}
      className={`relative group rounded-2xl transition-all duration-300 ${className}`}
      {...props}
    >
      <div className="w-full h-full relative rounded-2xl transition-all duration-300">
        {children}
      </div>
    </div>
  );
};

export default TiltCard;
