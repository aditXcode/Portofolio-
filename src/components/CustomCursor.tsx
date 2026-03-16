import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const rx = useSpring(mx, { stiffness: 500, damping: 40 });
  const ry = useSpring(my, { stiffness: 500, damping: 40 });
  const lx = useSpring(mx, { stiffness: 150, damping: 20 });
  const ly = useSpring(my, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); };
    const down = () => setClicked(true);
    const up   = () => setClicked(false);
    const chk  = (e: MouseEvent) => setHovered(!!(e.target as Element).closest('a,button,[data-cursor="hover"],input,textarea'));

    window.addEventListener('mousemove', move);
    window.addEventListener('mousemove', chk);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousemove', chk);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
    };
  }, [mx, my]);

  return (
    <>
      <motion.div className="cursor-dot" style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}>
        <motion.div animate={{ scale: clicked ? 0.4 : hovered ? 0 : 1 }} transition={{ duration: 0.12 }}
          style={{ width: 7, height: 7, borderRadius: '50%', background: '#B19EEF' }} />
      </motion.div>

      <motion.div className="cursor-dot" style={{ x: lx, y: ly, translateX: '-50%', translateY: '-50%' }}>
        <motion.div
          animate={{ scale: clicked ? 0.75 : hovered ? 1.7 : 1, borderColor: hovered ? 'rgba(177,158,239,0.9)' : 'rgba(177,158,239,0.35)' }}
          transition={{ duration: 0.18 }}
          style={{ width: 34, height: 34, borderRadius: '50%', border: '1px solid rgba(177,158,239,0.35)' }} />
      </motion.div>
    </>
  );
}
