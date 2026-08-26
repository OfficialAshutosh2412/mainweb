import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypingText = ({ texts, delayBetween = 2000 }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    if (subIndex === texts[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), delayBetween);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 40 : 100 - Math.random() * 40, 30));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, texts, delayBetween]);

  useEffect(() => {
    setCurrentText(texts[index].substring(0, subIndex));
  }, [subIndex, index, texts]);

  return (
    <span className="relative">
      <span className="text-white">{currentText}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block ml-1 w-[4px] h-[0.8em] bg-ambient-blue align-middle"
      />
    </span>
  );
};

export default TypingText;
